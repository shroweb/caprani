import { createClient, type ClientConfig, type QueryParams } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const apiVersion = "2026-06-23";

// `import.meta.env.VITE_*` is replaced at Vite BUILD time — it only has a
// value if the var was set in the environment that ran the build. Cloudflare
// Worker dashboard vars are only available at REQUEST time, via `process.env`
// (populated from the Worker's `env` bindings in src/server.ts, using the
// `nodejs_compat` flag). Check process.env first so dashboard-configured
// values actually take effect in production; fall back to import.meta.env
// for local dev, where .env.local is loaded into the Vite build directly.
function publicEnv(name: "VITE_SANITY_PROJECT_ID" | "VITE_SANITY_DATASET") {
  if (typeof process !== "undefined" && process.env?.[name]) {
    return process.env[name];
  }
  return import.meta.env[name] as string | undefined;
}

export function hasCmsConfig() {
  return Boolean(publicEnv("VITE_SANITY_PROJECT_ID") && publicEnv("VITE_SANITY_DATASET"));
}

type ResolvedClientConfig = ClientConfig & { projectId: string; dataset: string };

function config(usePreview = false): ResolvedClientConfig | undefined {
  const projectId = publicEnv("VITE_SANITY_PROJECT_ID");
  const dataset = publicEnv("VITE_SANITY_DATASET");

  if (!projectId || !dataset) return undefined;

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: !usePreview,
    perspective: usePreview ? "previewDrafts" : "published",
    token: usePreview ? process.env.SANITY_API_READ_TOKEN : undefined,
  };
}

export function getCmsClient(usePreview = false) {
  const clientConfig = config(usePreview);
  return clientConfig ? createClient(clientConfig) : undefined;
}

export function imageUrl(source: unknown, width = 1200) {
  const clientConfig = config(false);
  if (!clientConfig || !source) return undefined;

  return imageUrlBuilder(clientConfig).image(source).width(width).auto("format").fit("max").url();
}

export async function cmsFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  usePreview = false,
) {
  const client = getCmsClient(usePreview);
  if (!client) return undefined;

  try {
    return params
      ? await client.fetch<T>(query, params as QueryParams)
      : await client.fetch<T>(query);
  } catch (error) {
    console.error("CMS fetch failed", error);
    return undefined;
  }
}
