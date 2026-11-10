/** End-to-end route handler tests (fetch mocked; no live OpenDota calls). */
import { describe, expect, it } from "vitest";
import { mockFetch } from "../../../test/fetch";
import { rawHeroes, rawProfile, rawProPlayers } from "../../../test/fixtures/opendota";
import { GET as getEndpoint, POST as postEndpoint } from "./players/[id]/[...endpoint]/route";
import { GET as getProfile } from "./players/[id]/route";
import { GET as getProPlayers } from "./proPlayers/route";
import { GET as getSearch } from "./search/route";

const req = (url = "http://localhost/api/x", init?: RequestInit) => new Request(url, init);
const ctx = (id: string, endpoint: string[]) => ({
  params: Promise.resolve({ id, endpoint }),
});

describe("/api/players/[id]/[...endpoint]", () => {
  it("rejects invalid account ids", async () => {
    expect((await getEndpoint(req(), ctx("abc", ["wl"]))).status).toBe(400);
    expect((await getEndpoint(req(), ctx("4294967296", ["wl"]))).status).toBe(400);
  });

  it("rejects unknown endpoints and GET refresh, without calling upstream", async () => {
    const fetchMock = mockFetch([]);
    expect((await getEndpoint(req(), ctx("1", ["nope"]))).status).toBe(404);
    expect((await getEndpoint(req(), ctx("1", ["refresh"]))).status).toBe(404);
    expect((await getEndpoint(req(), ctx("1", ["histograms", "a/b"]))).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("only accepts POST for refresh", async () => {
    mockFetch([{ match: "/refresh", body: { length: 0 } }]);
    const post = (endpoint: string[]) =>
      postEndpoint(req("http://localhost/x", { method: "POST" }), ctx("1", endpoint));
    expect((await post(["wl"])).status).toBe(404);
    const res = await post(["refresh"]);
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it("serves mapped endpoints with a CDN cache header", async () => {
    mockFetch([{ match: "/players/1/heroes", body: rawHeroes }]);
    const res = await getEndpoint(
      req("http://localhost/api/players/1/heroes?date=90"),
      ctx("1", ["heroes"]),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toMatch(/s-maxage=\d+/);
    expect((await res.json())[0]).toMatchObject({ name: "Axe" });
  });

  it("proxies histograms/<field>", async () => {
    const fetchMock = mockFetch([{ match: "histograms/kills", body: [{ x: 1 }] }]);
    const res = await getEndpoint(req(), ctx("1", ["histograms", "kills"]));
    expect(await res.json()).toEqual([{ x: 1 }]);
    expect(String(fetchMock.mock.calls[0][0])).toContain("/players/1/histograms/kills");
  });

  it("returns JSON 502 when OpenDota fails", async () => {
    mockFetch([{ match: "/wl", status: 500 }]);
    const res = await getEndpoint(req(), ctx("1", ["wl"]));
    expect(res.status).toBe(502);
    expect(await res.json()).toHaveProperty("error");
  });
});

describe("/api/players/[id]", () => {
  it("returns the mapped profile", async () => {
    mockFetch([{ match: "/players/123", body: rawProfile }]);
    const res = await getProfile(req(), { params: Promise.resolve({ id: "123" }) });
    expect(await res.json()).toMatchObject({ accountId: 123 });
  });
});

describe("/api/proPlayers", () => {
  it("returns trimmed pro players", async () => {
    mockFetch([{ match: "/proPlayers", body: rawProPlayers }]);
    const res = await getProPlayers(req(), { params: Promise.resolve({}) });
    expect(await res.json()).toHaveLength(1);
  });
});

describe("/api/search", () => {
  it("skips the upstream call for short queries", async () => {
    const fetchMock = mockFetch([]);
    const res = await getSearch(req("http://localhost/api/search?q=ab"), {
      params: Promise.resolve({}),
    });
    expect(await res.json()).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("searches and caches results", async () => {
    mockFetch([{ match: "/search?q=miracle", body: rawProPlayers }]);
    const res = await getSearch(req("http://localhost/api/search?q=%20miracle%20"), {
      params: Promise.resolve({}),
    });
    expect(await res.json()).toHaveLength(2);
    expect(res.headers.get("Cache-Control")).toMatch(/s-maxage/);
  });
});
