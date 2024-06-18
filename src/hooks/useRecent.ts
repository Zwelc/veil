import { usePlayerRecentMatches } from "./usePlayer";

export function useRecent(id: string) {
  const { data } = usePlayerRecentMatches(id);

  if (data) {
    const recentWins = data.filter((match) => match.result === "Won").length;
    const mostFrequentGameMode = Array.from(new Set(data)).reduce(
      (prev, curr) =>
        data.filter((el) => el.gameMode === curr.gameMode).length >
        data.filter((el) => el.gameMode === prev.gameMode).length
          ? curr
          : prev
    );
    const mostFrequentHero = Array.from(new Set(data)).reduce((prev, curr) =>
      data.filter((el) => el.name === curr.name).length >
      data.filter((el) => el.name === prev.name).length
        ? curr
        : prev
    );
    let mostFrequentHeroKills = 0;
    let mostFrequentHeroDeaths = 0;
    let mostFrequentHeroAssists = 0;

    const mostFrequentGameModeMatches = data.filter(
      (match) => match.gameMode === mostFrequentGameMode.gameMode
    );
    const mostFrequentHeroMatches = data.filter(
      (hero) => hero.name === mostFrequentHero.name
    );
    mostFrequentHeroMatches.forEach((match) => {
      mostFrequentHeroKills += match.kills;
      mostFrequentHeroDeaths += match.deaths;
      mostFrequentHeroAssists += match.assists;
    });
    return {
      recentWins,
      recentMatches: data,
      mostFrequentGameMode,
      mostFrequentGameModeMatches,
      mostFrequentHero,
      mostFrequentHeroMatches,
      mostFrequentHeroKDA: `${(
        mostFrequentHeroKills / mostFrequentHeroMatches.length
      ).toFixed(0)} / ${(
        mostFrequentHeroDeaths / mostFrequentHeroMatches.length
      ).toFixed(0)} / ${(
        mostFrequentHeroAssists / mostFrequentHeroMatches.length
      ).toFixed(0)}`,
    };
  }

  return undefined;
}

export function useRecentStats(id: string) {
  const recent = useRecent(id);
  if (recent) {
    return [
      {
        title: "Top game mode in last 20 games",
        stat: recent.mostFrequentGameMode.gameMode,
        subtitle: `${recent.mostFrequentGameModeMatches.length} matches played`,
      },
      {
        title: "Wins in last 20 games",
        stat: `${recent.recentWins}`,
        subtitle: `${(
          (recent.recentWins / recent.recentMatches.length) *
          100
        ).toFixed(2)} % Winrate`,
      },
      {
        title: "Most Played Hero in last 20 games",
        stat: `${recent.mostFrequentHero.name}`,
        subtitle: `${(
          (recent.mostFrequentHeroMatches.filter(
            (match) => match.result == "Won"
          ).length /
            recent.mostFrequentHeroMatches.length) *
          100
        ).toFixed(2)} % Winrate`,
      },
      {
        title: `${recent.mostFrequentHero.name}'s KDA in last 20 games`,
        stat: `${recent.mostFrequentHeroKDA}`,
        subtitle: `Across ${recent.mostFrequentHeroMatches.length} matches`,
      },
    ];
  } else {
    return [];
  }
}
