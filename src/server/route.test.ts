import { describe, expect, it, vi } from "vitest";
import { HttpError } from "./opendota/http";
import { errorResponse, json, withPlayerRoute, withRoute } from "./route";

const ctx = <P,>(params: P) => ({ params: Promise.resolve(params) });

describe("json", () => {
  it("sets a CDN cache header when a ttl is given", () => {
    expect(json({}, 600).headers.get("Cache-Control")).toBe(
      "public, s-maxage=600, stale-while-revalidate=3600",
    );
  });

  it("disables caching by default", () => {
    expect(json({}).headers.get("Cache-Control")).toBe("no-store");
  });
});

describe("errorResponse", () => {
  it("uses HttpError status and message, uncached", async () => {
    const res = errorResponse(new HttpError(404, "Not found."));
    expect(res.status).toBe(404);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
    expect(await res.json()).toEqual({ error: "Not found." });
  });

  it("hides unexpected errors behind a 500", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = errorResponse(new TypeError("boom"));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Something went wrong." });
  });
});

describe("withRoute / withPlayerRoute", () => {
  it("resolves params and returns JSON with the ttl", async () => {
    const GET = withRoute(async (_req, params: { a: string }) => params, 60);
    const res = await GET(new Request("http://x/"), ctx({ a: "1" }));
    expect(await res.json()).toEqual({ a: "1" });
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=60");
  });

  it("rejects invalid account ids with 400 before calling the handler", async () => {
    const handler = vi.fn();
    const GET = withPlayerRoute(handler);
    const res = await GET(new Request("http://x/"), ctx({ id: "abc" }));
    expect(res.status).toBe(400);
    expect(handler).not.toHaveBeenCalled();
  });

  it("passes id and query string to the handler", async () => {
    const GET = withPlayerRoute(async (id, query) => ({ id, date: query.get("date") }));
    const res = await GET(new Request("http://x/?date=30"), ctx({ id: "42" }));
    expect(await res.json()).toEqual({ id: "42", date: "30" });
  });

  it("maps handler errors to responses", async () => {
    const GET = withPlayerRoute(async () => {
      throw new HttpError(503, "Rate limited");
    });
    expect((await GET(new Request("http://x/"), ctx({ id: "1" }))).status).toBe(503);
  });
});
