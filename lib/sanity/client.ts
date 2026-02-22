import { SANITY_API_VERSION } from "./constants";

export function isSanityConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET
  );
}

function createQueryUrl(query: string, params: Record<string, string> = {}) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  const search = new URLSearchParams({ query });

  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }

  return `https://${projectId}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${dataset}?${search.toString()}`;
}

interface SanityQueryResponse<T> {
  result: T;
}

export async function fetchSanityQuery<T>(
  query: string,
  params: Record<string, string> = {},
  revalidate = 120
): Promise<T | null> {
  const url = createQueryUrl(query, params);

  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as SanityQueryResponse<T>;
  return json.result ?? null;
}
