type D1Result = { success: boolean; meta?: unknown };

export type D1DatabaseLike = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      run: () => Promise<D1Result>;
      first?: <T = unknown>() => Promise<T | null>;
    };
    first?: <T = unknown>() => Promise<T | null>;
  };
};

export type R2BucketLike = {
  put: (
    key: string,
    value: ArrayBuffer | ReadableStream | string,
    options?: { httpMetadata?: Record<string, string> },
  ) => Promise<unknown>;
};

export type AppEnv = {
  DB?: D1DatabaseLike;
  PRIVATE_UPLOADS?: R2BucketLike;
  TURNSTILE_SECRET_KEY?: string;
  EMAIL_PROVIDER_API_KEY?: string;
  EMAIL_FROM?: string;
  EMAIL_TO?: string;
  CMS_PREVIEW_SECRET?: string;
  SANITY_WEBHOOK_SECRET?: string;
};

export function jsonResponse(payload: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init?.headers,
    },
  });
}

export function missingConfigResponse(missing: string[]) {
  return jsonResponse(
    {
      ok: false,
      message: "This endpoint is ready, but required production bindings are not configured yet.",
      missing,
    },
    { status: 503 },
  );
}

export function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
