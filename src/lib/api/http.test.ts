import { describe, expect, it } from "vitest";
import { mockFetch } from "../../../test/fetch";
import { ApiError, apiFetch, apiUrl } from "./http";
import { veilApi } from "./veil";

describe("apiUrl", () => {
  it("uses the same-origin /api base and drops empty params", () => {
    expect(apiUrl("/players/1/heroes", { date: 90, x: undefined, y: "" })).toBe(
      "/api/players/1/heroes?date=90",
    );
    expect(apiUrl("/proPlayers")).toBe("/api/proPlayers");
  });
});

describe("apiFetch", () => {
  it("returns parsed JSON", async () => {
    mockFetch([{ match: "/api/ok", body: { ok: 1 } }]);
    await expect(apiFetch("/ok")).resolves.toEqual({ ok: 1 });
  });

  it("throws ApiError with the server's message on failure", async () => {
    mockFetch([{ match: "/api/bad", status: 503, body: { error: "Rate limited" } }]);
    await expect(apiFetch("/bad")).rejects.toEqual(new ApiError(503, "Rate limited"));
  });

  it("falls back to a generic message for non-JSON errors", async () => {
    mockFetch([{ match: "/api/bad", status: 500, body: undefined }]);
    await expect(apiFetch("/bad")).rejects.toMatchObject({ status: 500 });
  });
});

describe("veilApi", () => {
  it("encodes ids and posts refresh", async () => {
    const fetchMock = mockFetch([{ match: "/refresh", body: {} }]);
    await veilApi.players.refresh("12 3");
    expect(fetchMock).toHaveBeenCalledWith("/api/players/12%203/refresh", {
      method: "POST",
    });
  });

  it("passes search terms as a query param", async () => {
    const fetchMock = mockFetch([{ match: "/api/search", body: [] }]);
    await veilApi.search("mira cle");
    expect(String(fetchMock.mock.calls[0][0])).toBe("/api/search?q=mira+cle");
  });
});
