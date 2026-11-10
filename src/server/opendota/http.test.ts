import { describe, expect, it, vi } from "vitest";
import { mockFetch } from "../../../test/fetch";
import {
  buildUrl,
  HttpError,
  isValidAccountId,
  OPENDOTA_URL,
  openDotaFetch,
} from "./http";

describe("buildUrl", () => {
  it("forwards query params and applies defaults only when absent", () => {
    expect(
      buildUrl("/players/1/heroes", {
        query: new URLSearchParams("date=30"),
        defaults: { significant: "0", date: "999" },
      }),
    ).toBe(`${OPENDOTA_URL}/players/1/heroes?date=30&significant=0`);
  });

  it("accepts a record and drops undefined/empty values", () => {
    expect(buildUrl("/search", { query: { q: "mira cle", x: undefined, y: "" } })).toBe(
      `${OPENDOTA_URL}/search?q=mira+cle`,
    );
  });
});

describe("openDotaFetch", () => {
  it("returns parsed JSON and passes the revalidate window", async () => {
    const fetchMock = mockFetch([{ match: "/players/1", body: { ok: true } }]);
    await expect(openDotaFetch("/players/1", { revalidate: 600 })).resolves.toEqual({
      ok: true,
    });
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: "GET",
      next: { revalidate: 600 },
    });
  });

  it("never caches POST requests", async () => {
    const fetchMock = mockFetch([{ match: "refresh", body: {} }]);
    await openDotaFetch("/players/1/refresh", { method: "POST", revalidate: 600 });
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "POST", cache: "no-store" });
  });

  it.each([
    [404, 404],
    [429, 503],
    [500, 502],
  ])("maps upstream %i to HttpError %i", async (upstream, expected) => {
    mockFetch([{ match: "/x", status: upstream, body: {} }]);
    await expect(openDotaFetch("/x")).rejects.toMatchObject({
      name: "HttpError",
      status: expected,
    });
  });

  it("maps network failures to 502", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(openDotaFetch("/x")).rejects.toEqual(new HttpError(502));
  });
});

describe("isValidAccountId", () => {
  it.each(["0", "123", "4294967295"])("accepts %s", (id) =>
    expect(isValidAccountId(id)).toBe(true),
  );
  it.each(["", "abc", "-1", "1.5", "4294967296", "12345678901", "1/../2"])(
    "rejects %s",
    (id) => expect(isValidAccountId(id)).toBe(false),
  );
});
