"use client";

import { useState } from "react";
import Image from "next/image";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberValue, type Row } from "./config";
import { NoData } from "./no-data";

export function RankingsView({ rows }: { rows: Row[] }) {
  const [showAll, setShowAll] = useState(false);
  const rankingRows = [...rows].sort(
    (a, b) => numberValue(b.percent_rank) - numberValue(a.percent_rank),
  );
  const visibleRows = showAll ? rankingRows : rankingRows.slice(0, 12);
  if (!rankingRows.length)
    return (
      <NoData
        icon={Crown}
        title="No hero rankings available"
        message="There are no leaderboard records for this account yet."
      />
    );
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle>Hero leaderboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your strongest ranked heroes, sorted by percentile.
          </p>
        </div>
        {rankingRows.length > 12 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show top 12" : `Show all ${rankingRows.length}`}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleRows.map((row, index) => {
            const name = String(row.name ?? `Hero ${String(row.hero_id)}`);
            const image = typeof row.image === "string" ? row.image : null;
            return (
              <Card
                key={`${row.hero_id}-${index}`}
                size="sm"
                className="relative overflow-hidden bg-background/65 shadow-none"
              >
                {image && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="object-cover opacity-15"
                  />
                )}
                <CardContent className="relative flex items-center gap-3 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    #{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      Score{" "}
                      {Math.round(numberValue(row.score)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold tabular-nums">
                      {(numberValue(row.percent_rank) * 100).toFixed(1)}%
                    </p>
                    <p className="text-[0.65rem] text-muted-foreground">
                      percentile
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
