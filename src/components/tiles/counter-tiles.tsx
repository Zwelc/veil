import { IPlayerParam } from "@/models/player.model";
import { useRecentStats } from "@/hooks/useRecent";
import { usePlayerWinrate } from "@/hooks/usePlayer";
import StatTile from "./stat-tile";
import SkeletonCard from "../skeleton/card";

export default function CounterTiles({ id }: IPlayerParam) {
  const { data, isLoading } = usePlayerWinrate(id);
  const recentStats = useRecentStats(id);
  const skeleton = new Array(6).fill(null);

  return (
    <div className="row-span-12 md:row-span-1 md:col-span-6 col-span-2">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-6 gap-2">
        {isLoading ? (
          skeleton.map((item, index) => <SkeletonCard key={index} />)
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
