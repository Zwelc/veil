import type { IPlayerSummary } from "./player";

/** Pro-scene counts for the landing page, derived from OpenDota's /proPlayers list. */
export interface IProScene {
  /** Players on the list with a match in the last 7 days. */
  activeWeek: number;
  /** Players on the list with a match in the last 30 days. */
  activeMonth: number;
  /** Distinct self-reported countries among the 30-day players. */
  countriesMonth: number;
  /** Everyone on the list. */
  listed: number;
  /** Top countries among the 30-day players (ISO alpha-2, uppercase), most first. */
  topCountries: { code: string; count: number }[];
  /** Newest match time on the list (ISO), i.e. how fresh these numbers are. */
  updatedAt: string | null;
}

/** Everything the landing page needs from one /proPlayers fetch. */
export interface IProLanding {
  pros: IPlayerSummary[];
  scene: IProScene;
}
