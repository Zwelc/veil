"use client";

import { Activity, BarChart3, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { titleCase } from "@/lib/dota";
import { MetricCard } from "@/components/tiles/metric-card";
import { numberValue, type Row } from "./config";
import { NoData } from "./no-data";

export function HistogramView({ rows, field }: { rows: Row[]; field: string }) {
  const points = [...rows]
    .filter((point) => numberValue(point.games) > 0)
    .sort((a, b) => numberValue(a.x) - numberValue(b.x));
  const maxGames = Math.max(
    1,
    ...points.map((point) => numberValue(point.games)),
  );
  const totalGames = points.reduce(
    (sum, point) => sum + numberValue(point.games),
    0,
  );
  const totalWins = points.reduce(
    (sum, point) => sum + numberValue(point.win),
    0,
  );
  const tickStep = Math.max(1, Math.ceil(points.length / 10));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <MetricCard
          icon={BarChart3}
          label="Matches represented"
          value={totalGames.toLocaleString()}
        />
        <MetricCard
          icon={Flame}
          label="Average win rate"
          value={`${totalGames ? ((totalWins / totalGames) * 100).toFixed(1) : "0.0"}%`}
        />
        <MetricCard
          icon={Activity}
          label="Stat"
          value={titleCase(field)}
          className="col-span-2 sm:col-span-1"
        />
      </div>
      {points.length === 0 ? (
        <NoData message="No distribution data is available for this stat." />
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{titleCase(field)} distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Each bar shows matches in a stat bucket. Hover or focus a bar for
              its win rate.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-1 border-b border-border/70 px-1 pt-6 sm:gap-1.5">
              {points.map((point, index) => {
                const games = numberValue(point.games);
                const wins = numberValue(point.win);
                const winRate = games ? wins / games : 0;
                const height = Math.max(2, (games / maxGames) * 100);
                return (
                  <div
                    key={`${point.x}-${index}`}
                    role="img"
                    tabIndex={0}
                    aria-label={`${titleCase(field)} ${String(point.x)}: ${games} matches, ${(winRate * 100).toFixed(1)} percent wins`}
                    className="group/bar relative flex h-full min-w-0 flex-1 flex-col justify-end outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    title={`${titleCase(field)} ${String(point.x)}: ${games} matches · ${(winRate * 100).toFixed(1)}% wins`}
                  >
                    <div
                      className="w-full rounded-t-sm bg-primary/25 transition-colors group-hover/bar:bg-primary/45"
                      style={{ height: `${height}%` }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-primary"
                      style={{
                        opacity: winRate,
                        height: `${Math.max(3, winRate * 5)}px`,
                      }}
                    />
                    {index % tickStep === 0 && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] text-muted-foreground tabular-nums">
                        {String(point.x)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex items-center justify-between text-xs text-muted-foreground">
              <span>Stat value bucket</span>
              <span>Games per bucket</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
