import { z } from "zod";
import { clientIp, jsonResponse, missingConfigResponse, type AppEnv } from "./platform";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  address: z.string().trim().min(3).max(160),
  service: z.string().min(1).max(120),
  date: z.string().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

const jobSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  role: z.string().min(1).max(120),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

async function verifyTurnstile(token: string | undefined, request: Request, env: AppEnv) {
  if (!env.TURNSTILE_SECRET_KEY) return { ok: true, skipped: true };
  if (!token) return { ok: false, error: "Missing bot-check token." };

  const body = new FormData();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  body.set("remoteip", clientIp(request));

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success ? { ok: true } : { ok: false, error: "Bot-check failed." };
}

function formDataToObject(formData: FormData) {
  return Object.fromEntries(
    [...formData.entries()].filter(([, value]) => typeof value === "string"),
  ) as Record<string, string>;
}

async function sendLeadEmail(subject: string, fields: Record<string, string>, env: AppEnv) {
  if (!env.EMAIL_PROVIDER_API_KEY || !env.EMAIL_TO || !env.EMAIL_FROM) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.EMAIL_PROVIDER_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject,
      text: Object.entries(fields)
        .map(([key, value]) => `${key}: ${value || "-"}`)
        .join("\n"),
    }),
  });
}

export async function handleContactSubmission(request: Request, env: AppEnv) {
  if (!env.DB) return missingConfigResponse(["DB"]);

  const formData = await request.formData();
  const parsed = contactSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    return jsonResponse({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, request, env);
  if (!turnstile.ok) return jsonResponse({ ok: false, message: turnstile.error }, { status: 400 });

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `insert into contact_submissions
      (id, name, phone, email, address, service, preferred_date, message, ip_address, user_agent, created_at)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
  )
    .bind(
      id,
      parsed.data.name,
      parsed.data.phone,
      parsed.data.email || null,
      parsed.data.address,
      parsed.data.service,
      parsed.data.date || null,
      parsed.data.message || null,
      clientIp(request),
      request.headers.get("user-agent") ?? null,
    )
    .run();

  await sendLeadEmail("New Caprani booking request", parsed.data, env);
  return jsonResponse({ ok: true, id });
}

export async function handleJobApplication(request: Request, env: AppEnv) {
  if (!env.DB) return missingConfigResponse(["DB"]);

  const formData = await request.formData();
  const parsed = jobSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    return jsonResponse({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, request, env);
  if (!turnstile.ok) return jsonResponse({ ok: false, message: turnstile.error }, { status: 400 });

  const cv = formData.get("cv");
  let cvKey: string | null = null;

  if (cv instanceof File && cv.size > 0) {
    if (!env.PRIVATE_UPLOADS) return missingConfigResponse(["PRIVATE_UPLOADS"]);

    const allowed = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    if (cv.size > 5 * 1024 * 1024) {
      return jsonResponse({ ok: false, message: "CV must be 5 MB or less." }, { status: 400 });
    }
    if (!allowed.has(cv.type)) {
      return jsonResponse(
        { ok: false, message: "CV must be a PDF, DOC or DOCX file." },
        { status: 400 },
      );
    }

    cvKey = `job-applications/${crypto.randomUUID()}-${cv.name.replace(/[^a-z0-9._-]/gi, "-")}`;
    await env.PRIVATE_UPLOADS.put(cvKey, await cv.arrayBuffer(), {
      httpMetadata: { contentType: cv.type },
    });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `insert into job_applications
      (id, name, email, phone, role, message, cv_key, ip_address, user_agent, created_at)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
  )
    .bind(
      id,
      parsed.data.name,
      parsed.data.email,
      parsed.data.phone,
      parsed.data.role,
      parsed.data.message || null,
      cvKey,
      clientIp(request),
      request.headers.get("user-agent") ?? null,
    )
    .run();

  await sendLeadEmail("New Caprani job application", { ...parsed.data, cvKey: cvKey ?? "" }, env);
  return jsonResponse({ ok: true, id });
}
