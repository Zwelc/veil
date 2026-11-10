import { m } from "framer-motion";
import { SearchX } from "lucide-react";
import PlayerCard from "../player-card";
import Grid from "../tiles/grid";
import { popIn } from "@/lib/motion";
import type { IPlayerSummary } from "@/models/player";

const GRID = "grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4";

type Props = {
  limit: number;
  loading: boolean;
  searching?: boolean;
  data?: IPlayerSummary[];
};

export default function PlayerGrid({
  limit,
  loading,
  searching = false,
  data = [],
}: Props) {
  if (loading) {
    return (
      <Grid className={GRID}>
        {Array.from({ length: limit }, (_, index) => (
          <div
            key={index}
            className="flex h-[5.5rem] animate-pulse items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3"
          >
            <div className="size-14 shrink-0 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-3 w-1/3 rounded bg-muted" />
            </div>
          </div>
        ))}
      </Grid>
    );
  }
  return (
    <Grid className={GRID}>
      {data.length > 0 ? (
        data
          .slice(0, limit)
          .map((player) => <PlayerCard player={player} key={player.account_id} />)
      ) : (
        <m.div
          variants={popIn}
          className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SearchX className="size-5" />
          </span>
          <p className="mt-4 font-semibold">
            {searching ? "No players found" : "No featured players available"}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {searching
              ? "Try a different spelling, or paste an account ID or profile link."
              : "Player listings are temporarily unavailable. Please try again shortly."}
          </p>
        </m.div>
      )}
    </Grid>
  );
}
