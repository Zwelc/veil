/** A player's match, as returned by /api/players/:id/matches and /recent. */
export interface IMatch {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  hero_id: number;
  start_time: number; // unix seconds
  duration: number; // seconds
  game_mode: number;
  lobby_type: number;
  kills: number;
  deaths: number;
  assists: number;
  gold_per_min?: number;
  xp_per_min?: number;
  hero_damage?: number;
  tower_damage?: number;
  hero_healing?: number;
  last_hits?: number;
  party_size?: number | null;
  // Added by the server mapper:
  name: string; // hero name
  image: string; // hero image URL
  won: boolean;
  ranked: boolean;
  gameMode: string; // e.g. "All Pick"
}
