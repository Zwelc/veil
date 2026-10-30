"use client";
import { use } from "react";

import { usePlayerHeroes } from "@/hooks/usePlayer";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IHero } from "@/models/hero";
import Image from "next/image";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data, isLoading, isError } = usePlayerHeroes(params.id);
  const heroes = [...(data ?? [])].sort((a, b) => b.games - a.games);
  const topHeroes = heroes.slice(0, 3);
  const totalPicks = heroes.reduce((sum, hero) => sum + hero.games, 0);
  const totalWins = heroes.reduce((sum, hero) => sum + hero.wins, 0);
  const overallWinRate = totalPicks ? (totalWins / totalPicks) * 100 : 0;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Hero performance
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Heroes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Picks, win rates, and head-to-head results from your match history.
          </p>
        </div>
        {!isLoading && !isError && (
          <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {heroes.length} heroes · {totalPicks.toLocaleString()} picks ·{" "}
            {overallWinRate.toFixed(1)}% overall win rate
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-52 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-destructive">
            Could not load hero statistics. Please try again.
          </CardContent>
        </Card>
      ) : heroes.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No hero data is available for this player yet.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {topHeroes.map((hero, index) => (
              <TopHeroCard key={hero.id} hero={hero} rank={index + 1} />
            ))}
          </div>

          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">All hero stats</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sort by games or win rate; matchup rates show your results with
                and against each hero.
              </p>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={heroes}
                filterPlaceholder="Search heroes..."
                pageSize={10}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function TopHeroCard({ hero, rank }: { hero: IHero; rank: number }) {
  const winRate = hero.games ? (hero.wins / hero.games) * 100 : 0;

  return (
    <Card className="group/top-hero relative isolate min-h-52 overflow-hidden border-border/70 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
      <Image
        src={hero.image}
        alt=""
        fill
        sizes="(min-width: 640px) 33vw, 100vw"
        className="z-0 object-cover opacity-60 transition duration-500 group-hover/top-hero:scale-105 group-hover/top-hero:opacity-75"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-card/55 via-card/40 to-primary/15" />
      <CardHeader className="relative z-10 flex flex-row items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            {rank === 1 ? "Signature pick" : `Top ${rank} pick`}
          </p>
          <CardTitle className="mt-1 text-lg">{hero.name}</CardTitle>
        </div>
        <span className="rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs font-semibold tabular-nums">
          #{rank}
        </span>
      </CardHeader>
      <CardContent className="relative z-10 mt-auto flex items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight tabular-nums">
            {hero.games.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">games played</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-tight tabular-nums">
            {winRate.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">
            {hero.wins.toLocaleString()} wins
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
