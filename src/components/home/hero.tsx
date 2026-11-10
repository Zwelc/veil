import Search from "@/components/layout/search";
import type { IPlayerSummary } from "@/models/player";
import type { IProScene } from "@/models/scene";
import { HeroHeadline, HeroItem, HeroStage } from "./hero-motion";
import LaneMap from "./lane-map";
import LiveBoard from "./live-board";
import StatBand from "./stat-band";

/** How many recently active pros the hero board lists. */
export const BOARD_SIZE = 6;

/**
 * Landing hero. Always dark (`dark` scopes the dark tokens to this section): the
 * lane map fades into a "fog of war" behind the headline and search, with the
 * recently active board on the right and the scene counts along the bottom.
 * Without pro data (OpenDota down at build time) it shows headline and search only.
 * Server-rendered; the map and the entrance motion are small client pieces.
 */
export default function Hero({
  pros,
  scene,
}: {
  pros?: IPlayerSummary[];
  scene?: IProScene;
}) {
  const board = pros?.slice(0, BOARD_SIZE) ?? [];

  return (
    <section className="dark relative isolate overflow-hidden border-b border-border bg-background text-foreground">
      <LaneMap className="pointer-events-none absolute -top-16 -right-24 -z-10 size-[54rem] max-w-none opacity-90" />
      <div aria-hidden="true" className="hero-fog pointer-events-none absolute inset-0 -z-10" />

      <HeroStage className="container mx-auto flex flex-wrap items-center gap-12 px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex max-w-2xl min-w-0 flex-[1_1_34rem] flex-col gap-6">
          <HeroItem>
            <p className="font-mono text-xs tracking-[0.16em] text-ember uppercase">
              Dota 2 player explorer
            </p>
          </HeroItem>
          <HeroHeadline className="font-display text-6xl leading-[0.88] font-black text-balance uppercase sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            Every match leaves a trail.
          </HeroHeadline>
          <HeroItem>
            <p className="max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg">
              Follow any public Dota 2 profile through its match history, hero
              pool, lifetime totals and the patterns between them.
            </p>
          </HeroItem>
          <HeroItem>
            <Search variant="hero" />
            <p className="mt-3 text-sm text-muted-foreground">
              Search by name, or paste an account ID or an OpenDota, Dotabuff,
              STRATZ or Steam profile link.
            </p>
          </HeroItem>
        </div>

        {board.length > 0 && (
          <HeroItem className="max-w-md min-w-0 flex-[1_1_22rem]">
            <LiveBoard pros={board} updatedAt={scene?.updatedAt ?? null} />
          </HeroItem>
        )}
      </HeroStage>

      {scene && scene.listed > 0 && <StatBand scene={scene} />}
    </section>
  );
}
