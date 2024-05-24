"use client";

import StatTile from "@/components/tiles/stat-tile";
import { useRecent } from "@/hooks/useRecent";

export default function TotalsTiles({ id }: { id: string }) {
  const recent = useRecent(id);
  return (
    <div className="w-full h-full grid grid-cols-4 col-span-2 md:col-span-4 gap-2">
      {recent && (
        <StatTile
          title="Top game mode in last 20 games"
          stat={`${recent.mostFrequentGameMode.gameMode}`}
          subtitle={`${recent.mostFrequentGameModeMatches.length} matches played`}
        />
      )}
      {recent && (
        <StatTile
          title="Wins in last 20 games"
          stat={`${recent.recentWins}`}
          subtitle={`${(
            (recent.recentWins / recent.recentMatches.length) *
            100
          ).toFixed(2)} % Winrate`}
        />
      )}
      {recent && (
        <StatTile
          title="Most Frequent Hero in last 20 games"
          stat={`${recent.mostFrequentHero.name}`}
          subtitle={`${(
            (recent.mostFrequentHeroMatches.filter(
              (match) => match.result == "Won"
            ).length /
              recent.mostFrequentHeroMatches.length) *
            100
          ).toFixed(2)} % Winrate`}
        />
      )}
      {recent && (
        <StatTile
          title={`${recent.mostFrequentHero.name}'s KDA in last 20 games`}
          stat={`${recent.mostFrequentHeroKDA}`}
          subtitle={`Across ${recent.mostFrequentHeroMatches.length} matches`}
        />
      )}
    </div>
  );
}
