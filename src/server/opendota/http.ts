import "server-only";

export const OPENDOTA_URL = "https://api.opendota.com/api";
const TIMEOUT_MS = 10_000;

/** The single error type of the server data layer; routes turn it into a response status. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message = "OpenDota is temporarily unavailable.",
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export type Query =
  | URLSearchParams
  | Record<string, string | number | undefined>
  | undefined;

export interface RequestOptions {
  /** Caller-supplied params (forwarded from the client request). */
  query?: Query;
  /** Applied only when the caller didn't supply the same key. */
  defaults?: Record<string, string>;
  /** Next.js data-cache lifetime in seconds. Omit (or POST) → not cached. */
  revalidate?: number;
  method?: "GET" | "POST";
}

export function buildUrl(
  path: string,
  { query, defaults = {} }: RequestOptions = {},
) {
  const url = new URL(`${OPENDOTA_URL}${path}`);
  const entries =
    query instanceof URLSearchParams
      ? [...query.entries()]
      : Object.entries(query ?? {});
  for (const [key, value] of entries) {
    if (value !== undefined && value !== "") {
      url.searchParams.append(key, String(value));
    }
  }
  for (const [key, value] of Object.entries(defaults)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}

/** The ONLY place the server calls OpenDota. */
export async function openDotaFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", revalidate } = options;
  let response: Response;
  try {
    response = await fetch(buildUrl(path, options), {
      method,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      ...(method === "POST" || revalidate === undefined
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });
  } catch {
    throw new HttpError(502);
  }

  if (!response.ok) {
    if (response.status === 404) throw new HttpError(404, "Not found.");
    if (response.status === 429) {
      throw new HttpError(
        503,
        "OpenDota rate limit reached. Please try again shortly.",
      );
    }
    throw new HttpError(502);
  }
  return (await response.json()) as T;
}

/** Validates a 32-bit Steam account ID passed as a path segment. */
export function isValidAccountId(id: string) {
  return /^\d{1,10}$/.test(id) && Number(id) <= 4294967295;
}
