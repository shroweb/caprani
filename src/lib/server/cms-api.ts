import { jsonResponse, type AppEnv } from "./platform";

export function handlePreview(request: Request, env: AppEnv) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const path = url.searchParams.get("path") || "/";

  if (!env.CMS_PREVIEW_SECRET || secret !== env.CMS_PREVIEW_SECRET) {
    return jsonResponse({ ok: false, message: "Invalid preview token." }, { status: 401 });
  }

  const redirect = new URL(path.startsWith("/") ? path : `/${path}`, url.origin);
  return Response.redirect(redirect, 307);
}

export async function handleRevalidate(request: Request, env: AppEnv) {
  const signature = request.headers.get("x-sanity-webhook-secret");
  if (!env.SANITY_WEBHOOK_SECRET || signature !== env.SANITY_WEBHOOK_SECRET) {
    return jsonResponse({ ok: false, message: "Invalid webhook secret." }, { status: 401 });
  }

  return jsonResponse({
    ok: true,
    message:
      "Webhook received. TanStack/Vite static caching is not enabled yet, so there is no build cache to purge.",
    receivedAt: new Date().toISOString(),
  });
}
