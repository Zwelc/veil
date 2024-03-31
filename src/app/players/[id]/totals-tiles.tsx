"use client";

import {
  useCounts,
  usePlayerPatchCounts,
  usePlayerRecentMatches,
  useTotals,
} from "@/hooks/usePlayer";
import { convertHMS } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalsTiles({ id }: { id: string }) {
  const { data, isLoading } = useTotals(id);
  const { data: recent, isLoading: recentLoading } = usePlayerRecentMatches(id);
  const skeleton = new Array(2).fill(null);

  return (
    <div className="w-full h-full grid grid-cols-4 col-span-2 md:col-span-4 gap-2">
      {recent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wins in last 20 games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recent?.filter((match) => match.result === "Won").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (recent?.filter((match) => match.result === "Won").length /
                  recent.length) *
                100
              ).toFixed(2)}
              % Winrate
            </p>
          </CardContent>
        </Card>
      )}
      {data &&
        data
          ?.filter(
            (entry: any) =>
              entry.field == "kills" ||
              entry.field == "deaths" ||
              entry.field == "level"
          )
          .map((entry: any) => (
            <Card key={entry.field}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average {entry.field}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {entry.field === "duration"
                    ? convertHMS(entry.sum)
                    : (entry.sum / entry.n).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Overall</p>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
