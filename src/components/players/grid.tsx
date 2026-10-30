/* eslint-disable @typescript-eslint/no-explicit-any */
import PlayerCard from "../player-card";
import Grid from "../tiles/grid";
import { SearchX } from "lucide-react";
type Props = {
  limit: number;
  loading: boolean;
  searching?: boolean;
  data?: any[];
};
export default function PlayerGrid({
  limit,
  loading,
  searching = false,
  data = [],
}: Props) {
  const skeleton = new Array(Math.min(limit, 8)).fill(null);

  if (loading) {
    return (
      <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {skeleton.map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl border border-border/60 bg-card/60"
          >
            <div className="h-24 rounded-t-2xl bg-muted/80" />
            <div className="flex flex-col items-center gap-4 p-5">
              <div className="-mt-12 size-20 rounded-full bg-muted ring-4 ring-card" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="mt-4 h-3 w-40 rounded bg-muted" />
              <div className="h-9 w-full rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </Grid>
    );
  }
  return (
    <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.length > 0 ? (
        data
          .slice(0, limit)
          .map((player: any) => (
            <PlayerCard player={player} key={player.account_id} />
          ))
      ) : (
        <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SearchX className="size-5" />
          </span>
          <p className="mt-4 font-semibold">
            {searching ? "No players found" : "No featured players available"}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {searching
              ? "Try a different spelling or another player name."
              : "Player listings are temporarily unavailable. Please try again shortly."}
          </p>
        </div>
      )}
    </Grid>
  );
}
