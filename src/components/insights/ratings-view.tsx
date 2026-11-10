"use client";

import { Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberValue, dateLabel, type Row } from "./config";
import { NoData } from "./no-data";

export function RatingsView({ rows }: { rows: Row[] }) {
  if (!rows.length)
    return (
      <NoData
        icon={Crown}
        title="No rank history yet"
        message="OpenDota has not recorded a medal update for this account."
      />
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank history</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recorded rank updates, newest first.
        </p>
      </CardHeader>
      <CardContent>
        <ol className="relative ml-3 space-y-4 border-l border-border/70 pl-6">
          {[...rows]
            .sort((a, b) => numberValue(b.time) - numberValue(a.time))
            .map((row, index) => (
              <li
                key={`${row.time}-${index}`}
                className="relative rounded-xl border border-border/60 bg-background/65 p-4"
              >
                <span className="absolute -left-[1.95rem] top-5 size-3 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    Rank tier {numberValue(row.rank_tier)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dateLabel(row.time)}
                  </p>
                </div>
                {numberValue(row.match_id) > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Match #{String(row.match_id)}
                  </p>
                )}
              </li>
            ))}
        </ol>
      </CardContent>
    </Card>
  );
}
