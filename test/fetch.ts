import { vi } from "vitest";

type Route = { match: string | RegExp; body?: unknown; status?: number };
type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

/** Stubs global fetch. The first route whose `match` is found in the URL wins. Unmatched → 404. */
export function mockFetch(routes: Route[]) {
  const fn = vi.fn<FetchFn>(async (input) => {
    const url = String(input instanceof Request ? input.url : input);
    const route = routes.find(({ match }) =>
      typeof match === "string" ? url.includes(match) : match.test(url),
    );
    const status = route?.status ?? (route ? 200 : 404);
    return new Response(JSON.stringify(route?.body ?? { error: "not found" }), {
      status,
      headers: { "content-type": "application/json" },
    });
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}
