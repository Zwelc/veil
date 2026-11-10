/** Error thrown by the browser data layer for any non-2xx /api response. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type Params = Record<string, string | number | undefined>;

/** Same-origin API base: no env var needed, works on every deployment. */
export const API_BASE = "/api";

export function apiUrl(path: string, params?: Params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const query = search.toString();
  return `${API_BASE}${path}${query ? `?${query}` : ""}`;
}

/** The ONLY place the browser calls fetch. */
export async function apiFetch<T>(
  path: string,
  params?: Params,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(apiUrl(path, params), init);
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new ApiError(
      response.status,
      body?.error ?? `Request failed (${response.status}).`,
    );
  }
  return (await response.json()) as T;
}
