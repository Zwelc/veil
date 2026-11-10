import { describe, expect, it } from "vitest";
import {
  rawCounts,
  rawHeroes,
  rawMatches,
  rawProfile,
  rawProPlayers,
} from "../../../test/fixtures/opendota";
import {
  censorPeople,
  cleanWordCloud,
  formatConstantName,
  HERO_IMAGE_FALLBACK,
  heroInfo,
  toCounts,
  toHeroRows,
  toMatchRows,
  toPlayerSummaries,
  toProfile,
  toProScene,
  toRankings,
} from "./mappers";

describe("formatConstantName", () => {
  it("strips the constant prefix and title-cases", () => {
    expect(formatConstantName("game_mode_all_pick")).toBe("All Pick");
    expect(formatConstantName("lobby_type_ranked_solo_mm")).toBe("Ranked Solo Mm");
    // The legacy slice(10) left a leading space for lobby types.
    expect(formatConstantName("lobby_type_normal")).toBe("Normal");
  });

  it("falls back for unknown constants", () => {
    expect(formatConstantName(undefined)).toBe("Unknown");
  });
});

describe("heroInfo", () => {
  it("resolves name, slug and a clean CDN image", () => {
    expect(heroInfo(1)).toEqual({
      name: "Anti-Mage",
      slug: "antimage",
      image:
        "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
    });
  });

  it("falls back for heroes missing from dotaconstants", () => {
    expect(heroInfo(9999)).toEqual({
      name: "Hero 9999",
      slug: "",
      image: HERO_IMAGE_FALLBACK,
    });
  });
});

describe("toMatchRows", () => {
  const rows = toMatchRows(rawMatches);

  it("drops matches without a hero", () => {
    expect(rows.map((row) => row.match_id)).toEqual([101, 102, 104]);
  });

  it("derives win/loss from the player's side", () => {
    expect(rows[0].won).toBe(true); // radiant & radiant won
    expect(rows[1].won).toBe(false); // dire & radiant won
    expect(rows[2].won).toBe(true); // dire & radiant lost
  });

  it("maps lobby, mode and hero", () => {
    expect(rows[0]).toMatchObject({
      name: "Anti-Mage",
      ranked: true,
      gameMode: "All Draft",
      duration: 2405,
    });
    expect(rows[1].ranked).toBe(false);
  });

  it("never throws on unknown constants", () => {
    expect(rows[2]).toMatchObject({
      name: "Hero 9999",
      ranked: false,
      gameMode: "Unknown",
    });
  });
});

describe("toHeroRows", () => {
  const rows = toHeroRows(rawHeroes);

  it("maps OpenDota fields to IHero", () => {
    expect(rows[0]).toMatchObject({
      id: 2,
      slug: "axe",
      name: "Axe",
      games: 40,
      wins: 22,
      gamesWith: 10,
      winsWith: 6,
      gamesAgainst: 12,
      winsAgainst: 5,
    });
  });

  it("attaches a lore excerpt to the most-played hero only", () => {
    const antiMage = rows.find((row) => row.id === 1)!;
    expect(antiMage.loreExcerpt).toMatch(/[.!?]$/);
    expect(rows.find((row) => row.id === 2)!.loreExcerpt).toBeUndefined();
  });

  it("handles an empty list", () => {
    expect(toHeroRows([])).toEqual([]);
  });
});

describe("toCounts", () => {
  const counts = toCounts(rawCounts);

  it("maps lobby types and game modes with names", () => {
    expect(counts.lobbyType).toContainEqual({ name: "Ranked", games: 30, win: 18 });
    expect(counts.gameMode).toEqual([{ name: "All Draft", games: 35, win: 19 }]);
  });

  it("fills every patch, defaulting missing ones to zero", () => {
    expect(counts.patch.find((p) => p.id === 60)).toMatchObject({ games: 12, win: 7 });
    expect(counts.patch.find((p) => p.id === 0)).toMatchObject({ games: 0, win: 0 });
  });

  it("tolerates an empty payload", () => {
    expect(toCounts({})).toMatchObject({ lobbyType: [], gameMode: [] });
  });
});

describe("toProfile", () => {
  it("censors the name but never the avatar URL", () => {
    const profile = toProfile(rawProfile, "123");
    expect(profile.personaname).not.toContain("shit");
    expect(profile.avatar).toBe(rawProfile.profile.avatarfull);
    expect(profile).toMatchObject({
      accountId: 123,
      countryName: "United States",
      rankTier: 55,
      leaderboardRank: null,
    });
  });

  it("handles a missing profile", () => {
    expect(toProfile({}, "5")).toEqual({
      accountId: 5,
      personaname: null,
      avatar: null,
      countryName: null,
      rankTier: null,
      leaderboardRank: null,
    });
  });
});

describe("toPlayerSummaries", () => {
  it("trims fields and can require an avatar", () => {
    expect(toPlayerSummaries(rawProPlayers, { requireAvatar: true })).toEqual([
      {
        account_id: 1,
        personaname: "Miracle-",
        avatarfull: "https://avatars.steamstatic.com/1.jpg",
        last_match_time: "2026-10-01T00:00:00.000Z",
      },
    ]);
    expect(toPlayerSummaries(rawProPlayers)).toHaveLength(2);
  });

  it("orders by most recent match and limits before mapping", () => {
    const raw = [
      { account_id: 1, personaname: "old", last_match_time: "2024-01-01T00:00:00Z" },
      { account_id: 2, personaname: "new", last_match_time: "2026-01-01T00:00:00Z" },
      { account_id: 3, personaname: "never", last_match_time: null },
      { account_id: 4, personaname: "mid", last_match_time: "2025-01-01T00:00:00Z" },
    ];
    expect(
      toPlayerSummaries(raw, { recentFirst: true, limit: 3 }).map((p) => p.account_id),
    ).toEqual([2, 4, 1]);
  });

  it("adds team tag and country code only when asked", () => {
    const [miracle, noAvatar] = toPlayerSummaries(rawProPlayers, { withTeam: true });
    expect(miracle).toMatchObject({ team_tag: "NGX", country_code: "JO" });
    expect(noAvatar).toMatchObject({ team_tag: null, country_code: null });
    expect(toPlayerSummaries(rawProPlayers)[0]).not.toHaveProperty("team_tag");
  });

  it("falls back to loccountrycode and drops malformed codes", () => {
    const raw = [
      { account_id: 1, loccountrycode: "se" },
      { account_id: 2, country_code: "unknown" },
    ];
    expect(
      toPlayerSummaries(raw, { withTeam: true }).map((p) => p.country_code),
    ).toEqual(["SE", null]);
  });
});

describe("toProScene", () => {
  const now = Date.parse("2026-11-10T16:00:00Z");
  const daysAgo = (d: number) => new Date(now - d * 864e5).toISOString();

  it("counts weekly and monthly players, countries and freshness", () => {
    const raw = [
      { last_match_time: daysAgo(1), country_code: "ru" },
      { last_match_time: daysAgo(3), loccountrycode: "RU" },
      { last_match_time: daysAgo(10), country_code: "se" },
      { last_match_time: daysAgo(20), country_code: "" },
      { last_match_time: daysAgo(45), country_code: "us" }, // outside 30 days
      { last_match_time: null },
      { last_match_time: daysAgo(-5), country_code: "cn" }, // future: bad data
    ];
    expect(toProScene(raw, now)).toEqual({
      activeWeek: 2,
      activeMonth: 4,
      countriesMonth: 2,
      listed: 7,
      topCountries: [
        { code: "RU", count: 2 },
        { code: "SE", count: 1 },
      ],
      updatedAt: daysAgo(1),
    });
  });

  it("falls back to loccountrycode when country_code is empty", () => {
    const raw = [
      { last_match_time: daysAgo(1), country_code: "", loccountrycode: "CN" },
      { last_match_time: daysAgo(1), country_code: "xx1", loccountrycode: "us" },
    ];
    expect(toProScene(raw, now).topCountries).toEqual([
      { code: "CN", count: 1 },
      { code: "US", count: 1 },
    ]);
    expect(
      toPlayerSummaries(
        raw.map((r, i) => ({ ...r, account_id: i })),
        { withTeam: true },
      ).map((p) => p.country_code),
    ).toEqual(["CN", "US"]);
  });

  it("limits top countries and breaks ties alphabetically", () => {
    const raw = ["fi", "de", "br", "de"].map((c) => ({
      last_match_time: daysAgo(1),
      country_code: c,
    }));
    expect(toProScene(raw, now, 2).topCountries).toEqual([
      { code: "DE", count: 2 },
      { code: "BR", count: 1 },
    ]);
  });

  it("handles an empty list", () => {
    expect(toProScene([], now)).toMatchObject({
      activeWeek: 0,
      listed: 0,
      topCountries: [],
      updatedAt: null,
    });
  });
});

describe("censorPeople / cleanWordCloud", () => {
  it("censors peer names", () => {
    const [person] = censorPeople([{ personaname: "fuck", account_id: 1 }]);
    expect(person.personaname).not.toBe("fuck");
    expect(person.account_id).toBe(1);
  });

  it("drops profane words from the word cloud", () => {
    expect(
      cleanWordCloud({ my_word_counts: { gg: 3, shit: 2 }, all_word_counts: undefined }),
    ).toEqual({ my_word_counts: { gg: 3 }, all_word_counts: {} });
  });
});

describe("toRankings", () => {
  it("adds hero name and image", () => {
    expect(
      toRankings([{ hero_id: 1, score: 1234.5, percent_rank: 0.9, card: 10 }]),
    ).toEqual([
      {
        hero_id: 1,
        name: "Anti-Mage",
        image: heroInfo(1).image,
        score: 1234.5,
        percent_rank: 0.9,
        card: 10,
      },
    ]);
    expect(toRankings([{ hero_id: 9999 }])[0].image).toBeNull();
  });
});
