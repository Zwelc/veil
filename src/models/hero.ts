export interface IHero {
  id: number;
  slug: string; // e.g. "antimage"
  image: string;
  name: string;
  games: number;
  gamesWith: number;
  gamesAgainst: number;
  wins: number;
  winsWith: number;
  winsAgainst: number;
  lastPlayed: number;
  /** First sentence of hero lore; present only on the most-played hero to keep the payload small. */
  loreExcerpt?: string;
}
