/** Profile header data, as returned by /api/players/:id. */
export interface IPlayerProfile {
  accountId: number;
  personaname: string | null;
  avatar: string | null;
  countryName: string | null;
  rankTier: number | null;
  leaderboardRank: number | null;
}

/** Minimal player card data shared by pro listings and search results. */
export interface IPlayerSummary {
  account_id: number;
  personaname: string;
  avatarfull: string | null;
  last_match_time: string | null; // ISO date
  /** Pro listings only. */
  team_tag?: string | null;
  /** Pro listings only: ISO 3166-1 alpha-2, uppercase. */
  country_code?: string | null;
}

export interface IWinLoss {
  win: number;
  lose: number;
}

/** A hero leaderboard entry, as returned by /api/players/:id/rankings. */
export interface IHeroRanking {
  hero_id: number;
  name: string;
  image: string | null;
  score: number;
  percent_rank: number;
  card: number;
}
