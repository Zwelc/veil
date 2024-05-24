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
      mostFrequentHeroKDA: `${mostFrequentHeroKills} / ${mostFrequentHeroDeaths} / ${mostFrequentHeroAssists}`,
    };
  }
}
