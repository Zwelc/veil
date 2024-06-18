import { IPlayerParam } from "@/models/player.model";
import { useRecentStats } from "@/hooks/useRecent";
import { usePlayerWinrate } from "@/hooks/usePlayer";
import StatTile from "./stat-tile";

export default function CounterTiles({ id }: IPlayerParam) {
  const { data, isLoading } = usePlayerWinrate(id);
  const recentStats = useRecentStats(id);
  const skeleton = new Array(6).fill(null);

  if (isLoading) {
    return (
      <div className="row-span-12 md:row-span-1 md:col-span-6 col-span-2">
        {skeleton.map((item, index) => (
          <div
            key={index}
            className="tile animate-pulse flex flex-col items-center justify-center"
          >
            <div className="animate-pulse h-2 bg-gray-200 rounded-full  max-w-[48px] mb-2.5"></div>
            <div className="animate-pulse h-2 bg-gray-200 max-w-[16px]"></div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="row-span-12 md:row-span-1 md:col-span-6 col-span-2">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-6 gap-2">
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
      </div>
    </div>
  );
}
