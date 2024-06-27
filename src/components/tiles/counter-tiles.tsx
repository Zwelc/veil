import { IPlayerParam } from "@/models/player.model";
import { useRecentStats } from "@/hooks/useRecent";
import { usePlayerWinrate } from "@/hooks/usePlayer";
import StatTile from "./stat-tile";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CounterTiles({ id }: IPlayerParam) {
  const { data, isLoading } = usePlayerWinrate(id);
  const recentStats = useRecentStats(id);
  const skeleton = new Array(6).fill(null);

  return (
    <div className="row-span-12 md:row-span-1 md:col-span-6 col-span-2">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-6 gap-2">
        {isLoading ? (
          skeleton.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[140px]" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatTile
              title="Total Games"
              stat={data.win + data.lose}
              subtitle={`${((data.win / (data.win + data.lose)) * 100).toFixed(
                2
              )} % Winrate`}
            />
            <StatTile title="Total Wins" stat={data.win} subtitle={`Overall`} />
            {recentStats.map((stat) => (
              <StatTile
                key={stat.title}
                title={stat.title}
                stat={stat.stat}
                subtitle={stat.subtitle}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
