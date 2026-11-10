// Minimal typings for the parts of dotaconstants Veil uses. Only import it from server code.
declare module "dotaconstants" {
  export interface DotaHero {
    id: number;
    name: string; // e.g. "npc_dota_hero_antimage"
    localized_name: string;
    img: string; // CDN path, e.g. "/apps/dota2/images/dota_react/heroes/antimage.png?"
    icon: string;
  }
  export interface DotaNamedConstant {
    id: number;
    name: string; // e.g. "game_mode_all_pick", "lobby_type_ranked"
    balanced?: boolean;
  }
  export interface DotaPatch {
    id: number;
    name: string;
    date: string;
  }
  export interface DotaCountry {
    cca2: string;
    name: { common: string };
  }

  export const heroes: Record<string, DotaHero | undefined>;
  export const game_mode: Record<string, DotaNamedConstant | undefined>;
  export const lobby_type: Record<string, DotaNamedConstant | undefined>;
  export const patch: DotaPatch[];
  export const countries: Record<string, DotaCountry | undefined>;
  export const hero_lore: Record<string, string | undefined>;
}
