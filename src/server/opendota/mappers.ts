import "server-only";
import {
  countries,
  game_mode,
  hero_lore,
  heroes,
  lobby_type,
  patch,
} from "dotaconstants";
import { IMAGE_CDN } from "@/lib/constants";
import { isRadiant, titleCase } from "@/lib/dota";
import { censorText, hasProfanity } from "@/server/profanity";
import type { ICounts, ICountType } from "@/models/counts";
import type { IHero } from "@/models/hero";
import type { IMatch } from "@/models/match";
import type {
  IHeroRanking,
  IPlayerProfile,
  IPlayerSummary,
} from "@/models/player";
import type { IProScene } from "@/models/scene";

/** Raw OpenDota shapes: only the fields Veil reads. */
type RawRecord = Record<string, unknown>;
type RawCount = { games?: number; win?: number };
export type RawMatch = Omit<
  IMatch,
  "name" | "image" | "won" | "ranked" | "gameMode"
>;

export const HERO_IMAGE_FALLBACK = "/icon.png";

const num = (value: unknown) =>
  typeof value === "number" ? value : Number(value) || 0;
const str = (value: unknown) =>
  typeof value === "string" && value ? value : null;

/** "game_mode_all_pick" → "All Pick", "lobby_type_ranked" → "Ranked". */
export function formatConstantName(name: string | undefined) {
  if (!name) return "Unknown";
  return titleCase(name.replace(/^(game_mode|lobby_type)_/, ""));
}

export function heroInfo(heroId: number) {
  const hero = heroes[String(heroId)];
  if (!hero) {
    return { name: `Hero ${heroId}`, slug: "", image: HERO_IMAGE_FALLBACK };
  }
  return {
    name: hero.localized_name,
    slug: hero.name.replace(/^npc_dota_hero_/, ""),
    image: `${IMAGE_CDN}${hero.img.replace(/\?$/, "")}`,
  };
}

export function isRankedLobby(lobbyTypeId: number) {
  return /^lobby_type_ranked/.test(
    lobby_type[String(lobbyTypeId)]?.name ?? "",
  );
}

export function gameModeName(gameModeId: number) {
  return formatConstantName(game_mode[String(gameModeId)]?.name);
}

/** Shared by /matches and /recent. */
export function toMatchRows(raw: RawMatch[]): IMatch[] {
  return raw
    .filter((match) => match.hero_id > 0)
    .map((match) => {
      const hero = heroInfo(match.hero_id);
      return {
        ...match,
        duration: num(match.duration),
        name: hero.name,
        image: hero.image,
        won: Boolean(match.radiant_win) === isRadiant(match.player_slot),
        ranked: isRankedLobby(match.lobby_type),
        gameMode: gameModeName(match.game_mode),
      };
    });
}

export type RawHero = {
  hero_id: number | string;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
  last_played: number;
};

export function toHeroRows(raw: RawHero[]): IHero[] {
  const rows: IHero[] = raw.map((hero) => {
    const id = num(hero.hero_id);
    const info = heroInfo(id);
    return {
      id,
      slug: info.slug,
      image: info.image,
      name: info.name,
      games: num(hero.games),
      gamesWith: num(hero.with_games),
      gamesAgainst: num(hero.against_games),
      wins: num(hero.win),
      winsWith: num(hero.with_win),
      winsAgainst: num(hero.against_win),
      lastPlayed: num(hero.last_played),
    };
  });

  // Attach lore to the most-played hero only (used by the profile spotlight).
  const top = rows.reduce<IHero | undefined>(
    (best, hero) => (!best || hero.games > best.games ? hero : best),
    undefined,
  );
  const lore = top?.slug ? hero_lore[top.slug] : undefined;
  if (top && lore) top.loreExcerpt = lore.split(/(?<=[.!?])\s+/)[0];
  return rows;
}

export type RawCounts = {
  lobby_type?: Record<string, RawCount>;
  game_mode?: Record<string, RawCount>;
  patch?: Record<string, RawCount>;
};

function toCountList(
  counts: Record<string, RawCount> | undefined,
  lookup: Record<string, { name: string } | undefined>,
): ICountType[] {
  return Object.entries(counts ?? {}).map(([id, value]) => ({
    name: formatConstantName(lookup[id]?.name),
    games: num(value.games),
    win: num(value.win),
  }));
}

export function toCounts(raw: RawCounts): ICounts {
  return {
    patch: patch.map((entry) => ({
      ...entry,
      games: num(raw.patch?.[entry.id]?.games),
      win: num(raw.patch?.[entry.id]?.win),
    })),
    lobbyType: toCountList(raw.lobby_type, lobby_type),
    gameMode: toCountList(raw.game_mode, game_mode),
  };
}

export type RawProfile = {
  profile?: RawRecord;
  rank_tier?: number | null;
  leaderboard_rank?: number | null;
};

export function toProfile(raw: RawProfile, accountId: string): IPlayerProfile {
  const profile = raw.profile ?? {};
  const countryCode = str(profile.loccountrycode);
  return {
    accountId: Number(accountId),
    personaname: censorText(str(profile.personaname)),
    avatar: str(profile.avatarfull),
    countryName: countryCode
      ? (countries[countryCode]?.name.common ?? null)
      : null,
    rankTier: raw.rank_tier ?? null,
    leaderboardRank: raw.leaderboard_rank ?? null,
  };
}

/**
 * Pro listings and search results → trimmed card data (smaller payload).
 * Filtering, ordering and limiting happen before censoring, so only kept rows pay for it.
 */
export function toPlayerSummaries(
  raw: RawRecord[],
  {
    requireAvatar = false,
    recentFirst = false,
    limit = Infinity,
    withTeam = false,
  } = {},
): IPlayerSummary[] {
  const lastMatch = (player: RawRecord) => str(player.last_match_time) ?? "";
  const rows = raw.filter((player) => !requireAvatar || str(player.avatarfull));
  if (recentFirst) rows.sort((a, b) => lastMatch(b).localeCompare(lastMatch(a)));
  return rows.slice(0, limit).map((player) => {
    const summary: IPlayerSummary = {
      account_id: num(player.account_id),
      personaname: censorText(
        str(player.personaname) ?? str(player.name) ?? "Unknown player",
      ),
      avatarfull: str(player.avatarfull),
      last_match_time: str(player.last_match_time),
    };
    if (!withTeam) return summary;
    const teamTag = str(player.team_tag)?.trim();
    return {
      ...summary,
      team_tag: teamTag ? censorText(teamTag) : null,
      country_code: countryOf(player),
    };
  });
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Landing-page counts from the raw /proPlayers list, computed in the same pass
 * as the summaries so the page costs one upstream call. Match times more than a
 * day in the future are treated as bad data and ignored.
 */
export function toProScene(
  raw: RawRecord[],
  now: number,
  topCountries = 6,
): IProScene {
  let activeWeek = 0;
  let newest = 0;
  const monthByCountry = new Map<string, number>();
  let activeMonth = 0;

  for (const player of raw) {
    const time = Date.parse(str(player.last_match_time) ?? "");
    if (Number.isNaN(time) || time > now + DAY_MS) continue;
    if (time > newest) newest = time;
    const age = now - time;
    if (age > 30 * DAY_MS) continue;
    activeMonth++;
    if (age <= 7 * DAY_MS) activeWeek++;
    const code = countryOf(player);
    if (code) monthByCountry.set(code, (monthByCountry.get(code) ?? 0) + 1);
  }

  return {
    activeWeek,
    activeMonth,
    countriesMonth: monthByCountry.size,
    listed: raw.length,
    topCountries: [...monthByCountry]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, topCountries)
      .map(([code, count]) => ({ code, count })),
    updatedAt: newest ? new Date(newest).toISOString() : null,
  };
}

/**
 * A player's country: `country_code`, else `loccountrycode`. Not `??`: OpenDota
 * sends an empty country_code for many players who do have a loccountrycode.
 */
function countryOf(player: RawRecord): string | null {
  return toCountryCode(player.country_code) ?? toCountryCode(player.loccountrycode);
}

/** "jo" → "JO"; anything that isn't a two-letter code → null. */
function toCountryCode(value: unknown): string | null {
  const code = str(value)?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : null;
}

/** Peers / pros: censor display names, keep everything else. */
export function censorPeople(raw: RawRecord[]): RawRecord[] {
  return raw.map((person) => ({
    ...person,
    personaname: censorText(str(person.personaname)),
    name: censorText(str(person.name)),
  }));
}

export type RawWordCloud = Record<string, Record<string, number> | undefined>;

/** Drop profane words from the chat word cloud (censoring keys could collide). */
export function cleanWordCloud(raw: RawWordCloud): RawWordCloud {
  return Object.fromEntries(
    Object.entries(raw).map(([source, words]) => [
      source,
      Object.fromEntries(
        Object.entries(words ?? {}).filter(([word]) => !hasProfanity(word)),
      ),
    ]),
  );
}

export function toRankings(raw: RawRecord[]): IHeroRanking[] {
  return raw.map((row) => {
    const heroId = num(row.hero_id);
    const info = heroInfo(heroId);
    return {
      hero_id: heroId,
      name: info.name,
      image: info.slug ? info.image : null,
      score: num(row.score),
      percent_rank: num(row.percent_rank),
      card: num(row.card),
    };
  });
}
