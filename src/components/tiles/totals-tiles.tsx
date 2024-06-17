"use client";

import StatTile from "@/components/tiles/stat-tile";
import { useRecentStats } from "@/hooks/useRecent";

type IRecentStat = {
  title: string;
  stat: string;
  subtitle: string;
};
export default function TotalsTiles({ id }: { id: string }) {
  const recentStats = useRecentStats(id);

  return (
    <div className="w-full h-full grid grid-cols-4 col-span-2 md:col-span-4 gap-2">
      {recentStats.map((stat) => (
        <StatTile
          key={stat.title}
          title={stat.title}
          stat={stat.stat}
          subtitle={stat.subtitle}
        />
      ))}
    </div>
  );
}
