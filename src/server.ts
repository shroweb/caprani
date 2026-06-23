import "./lib/error-capture";

import { handlePreview, handleRevalidate } from "./lib/server/cms-api";
import { handleContactSubmission, handleJobApplication } from "./lib/server/forms";
import type { AppEnv } from "./lib/server/platform";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // Cloudflare Worker dashboard vars/secrets only arrive via this `env`
      // parameter at request time. Mirror them onto `process.env` (available
      // thanks to the `nodejs_compat` flag) so code that reads
      // `process.env.*` directly — e.g. the Sanity client config — sees them.
      if (env && typeof env === "object") {
        Object.assign(process.env, env as Record<string, string>);
      }

      const url = new URL(request.url);
      const appEnv = env as AppEnv;

      if (request.method === "POST" && url.pathname === "/api/contact") {
        return handleContactSubmission(request, appEnv);
      }

      if (request.method === "POST" && url.pathname === "/api/jobs/apply") {
        return handleJobApplication(request, appEnv);
      }

      if (request.method === "GET" && url.pathname === "/api/preview") {
        return handlePreview(request, appEnv);
      }

      if (request.method === "POST" && url.pathname === "/api/revalidate") {
        return handleRevalidate(request, appEnv);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
