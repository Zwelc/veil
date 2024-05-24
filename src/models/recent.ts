export interface IRecentMatchesResponse {
  match_id: number;
  player_slot: number;
  radiant_win: false;
  hero_id: number;
  start_time: number;
  game_mode: number;
  lobby_type: number;
  version: number | null;
  kills: number;
  deaths: number;
  assists: number;
  average_rank: number;
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number | null;
  lane_role: number | null;
  is_roaming: boolean | null;
  cluster: 213;
  leaver_status: 0;
  party_size: number | null;
  image: string;
  name: string;
  result: string;
  kda: string;
  duration: string;
  lobby: string;
  gameMode: string;
}
