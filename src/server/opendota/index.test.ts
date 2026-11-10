import { describe, expect, it } from "vitest";
import { mockFetch } from "../../../test/fetch";
import {
  rawCounts,
  rawHeroes,
  rawMatches,
  rawProfile,
  rawProPlayers,
} from "../../../test/fixtures/opendota";
import { FEATURED_PRO_LIMIT } from "@/lib/constants";
import { CACHE_TTL, OpenDota } from "./index";

const calledUrl = (fetchMock: ReturnType<typeof mockFetch>) =>
  String(fetchMock.mock.calls[0][0]);
const calledInit = (fetchMock: ReturnType<typeof mockFetch>) =>
  fetchMock.mock.calls[0][1] as RequestInit & { next?: { revalidate?: number } };

describe("OpenDota facade", () => {
  it("getProPlayers trims, filters and caches for hours", async () => {
    const fetchMock = mockFetch([{ match: "/proPlayers", body: rawProPlayers }]);
    const pros = await OpenDota.getProPlayers();
    expect(pros).toHaveLength(1);
    expect(Object.keys(pros[0])).toEqual([
      "account_id",
      "personaname",
      "avatarfull",
      "last_match_time",
      "team_tag",
      "country_code",
    ]);
    expect(calledInit(fetchMock).next?.revalidate).toBe(CACHE_TTL.proPlayers);
  });

  it("getProLanding derives pros and scene counts from a single upstream call", async () => {
    const fetchMock = mockFetch([{ match: "/proPlayers", body: rawProPlayers }]);
    const { pros, scene } = await OpenDota.getProLanding(
      Date.parse("2026-10-05T00:00:00Z"),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(pros.map((p) => p.account_id)).toEqual([1]);
    expect(scene).toMatchObject({ listed: 2, activeWeek: 1, activeMonth: 1 });
    expect(scene.topCountries).toEqual([{ code: "JO", count: 1 }]);
  });

  it("getProPlayers caps the featured list at FEATURED_PRO_LIMIT", async () => {
    mockFetch([
      {
        match: "/proPlayers",
        body: Array.from({ length: FEATURED_PRO_LIMIT + 50 }, (_, i) => ({
          account_id: i,
          personaname: `p${i}`,
          avatarfull: "https://avatars.steamstatic.com/a.jpg",
          last_match_time: new Date(1_700_000_000_000 + i * 1000).toISOString(),
        })),
      },
    ]);
    const pros = await OpenDota.getProPlayers();
    expect(pros).toHaveLength(FEATURED_PRO_LIMIT);
    expect(pros[0].account_id).toBe(FEATURED_PRO_LIMIT + 49); // most recent first
  });

  it("caches every mapped GET with its TTL", async () => {
    const fetchMock = mockFetch([{ match: "/players/", body: [] }]);
    await OpenDota.getRecentMatches("1");
    await OpenDota.getPeers("1");
    await OpenDota.getRankings("1");
    const ttls = fetchMock.mock.calls.map(
      ([, init]) => (init as { next?: { revalidate?: number } }).next?.revalidate,
    );
    expect(ttls).toEqual([CACHE_TTL.matches, CACHE_TTL.insights, CACHE_TTL.insights]);
  });

  it("search passes q and returns summaries", async () => {
    const fetchMock = mockFetch([{ match: "/search", body: rawProPlayers }]);
    const results = await OpenDota.search("mira");
    expect(calledUrl(fetchMock)).toContain("/search?q=mira");
    expect(results).toHaveLength(2);
    expect(calledInit(fetchMock).next?.revalidate).toBe(CACHE_TTL.search);
  });

  it("getProfile maps the profile", async () => {
    const fetchMock = mockFetch([{ match: "/players/123", body: rawProfile }]);
    expect(await OpenDota.getProfile("123")).toMatchObject({
      accountId: 123,
      countryName: "United States",
    });
    expect(calledInit(fetchMock).next?.revalidate).toBe(CACHE_TTL.profile);
  });

  it("getHeroes defaults significant=0 but respects caller params", async () => {
    const fetchMock = mockFetch([{ match: "/heroes", body: rawHeroes }]);
    const heroes = await OpenDota.getHeroes("1", new URLSearchParams("date=90"));
    expect(calledUrl(fetchMock)).toMatch(/\/players\/1\/heroes\?date=90&significant=0$/);
    expect(heroes).toHaveLength(2);
  });

  it("getMatches and getRecentMatches share the match mapper", async () => {
    mockFetch([
      { match: "/recentMatches", body: rawMatches },
      { match: "/matches", body: rawMatches },
    ]);
    const [all, recent] = await Promise.all([
      OpenDota.getMatches("1"),
      OpenDota.getRecentMatches("1"),
    ]);
    expect(all).toEqual(recent);
    expect(all[0]).toMatchObject({ won: true, ranked: true });
  });

  it("getCounts maps counts", async () => {
    mockFetch([{ match: "/counts", body: rawCounts }]);
    expect((await OpenDota.getCounts("1")).gameMode).toHaveLength(1);
  });

  it("getRaw uses the endpoint's TTL", async () => {
    const fetchMock = mockFetch([{ match: "/histograms/kills", body: [] }]);
    await OpenDota.getRaw("1", "histograms/kills");
    expect(calledInit(fetchMock).next?.revalidate).toBe(CACHE_TTL.insights);
  });

  it("refresh POSTs without caching", async () => {
    const fetchMock = mockFetch([{ match: "/refresh", body: {} }]);
    await OpenDota.refresh("1");
    expect(calledInit(fetchMock)).toMatchObject({ method: "POST", cache: "no-store" });
  });
});
