import { IPlayerParam } from "@/models/player.model";
import { useRecent } from "@/hooks/useRecent";
import { usePlayerWinrate } from "@/hooks/usePlayer";
import StatTile from "./stat-tile";
import SkeletonCard from "../skeleton/card";
import { Activity, Coins, Crosshair, Gauge, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CounterTiles({ id }: IPlayerParam) {
  const { data, isLoading } = usePlayerWinrate(id);
  const recent = useRecent(id);
  const skeleton = new Array(6).fill(null);
  const totalGames = (data?.win ?? 0) + (data?.lose ?? 0);
  const winRate = totalGames ? ((data?.win ?? 0) / totalGames) * 100 : 0;
  const recentMatches = recent?.latestMatches ?? [];
  const form = recent?.form ?? [];
  const recentWinRate = recent?.recentMatches.length
    ? (recent.recentWins / recent.recentMatches.length) * 100
    : 0;
  const recentWinRateDelta = recent ? recentWinRate - winRate : 0;
  const deltaLabel = `${recentWinRateDelta >= 0 ? "+" : ""}${recentWinRateDelta.toFixed(1)} pp vs career`;

  return (
    <div className="col-span-1 space-y-4 md:col-span-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Performance snapshot
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            At a glance
          </h2>
        </div>
        {form.length > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              Last {form.length}
            </span>
            <div
              className="flex items-center gap-1"
              aria-label={`${form.filter(Boolean).length} wins in last ${form.length} matches`}
            >
              {form.map((won, index) => (
                <span
                  key={index}
                  title={won ? "Victory" : "Defeat"}
                  className={`size-2.5 rounded-full ${won ? "bg-emerald-500" : "bg-rose-500"}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold tabular-nums">
              {form.filter(Boolean).length}W
            </span>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {isLoading ? (
          skeleton.map((item, index) => <SkeletonCard key={index} />)
        ) : (
          <>
            <StatTile
              title="Lifetime matches"
              stat={totalGames.toLocaleString()}
              subtitle={`${(data?.win ?? 0).toLocaleString()} wins · ${(data?.lose ?? 0).toLocaleString()} losses`}
              icon={Activity}
            />
            <StatTile
              title="Lifetime win rate"
              stat={`${winRate.toFixed(1)}%`}
              subtitle="Across all recorded matches"
              icon={Trophy}
              accent="success"
              progress={winRate}
            />
            {recent?.recentMatches.length ? (
              <>
                <StatTile
                  title="Recent form · last 20"
                  stat={`${recent.recentWins}W – ${recent.recentMatches.length - recent.recentWins}L`}
                  subtitle={`${recentWinRate.toFixed(1)}% win rate · ${deltaLabel}`}
                  icon={Trophy}
                  accent={recentWinRateDelta >= 0 ? "success" : "warning"}
                  progress={recentWinRate}
                />
                <StatTile
                  title="Average K / D / A"
                  stat={recent.averageKda}
                  subtitle={`Across ${recent.recentMatches.length} matches`}
                  icon={Crosshair}
                />
                <StatTile
                  title="Average gold / min"
                  stat={recent.averageGpm.toLocaleString()}
                  subtitle="Last 20 matches · GPM"
                  icon={Coins}
                />
                <StatTile
                  title="Average XP / min"
                  stat={recent.averageXpm.toLocaleString()}
                  subtitle="Last 20 matches · XPM"
                  icon={Gauge}
                />
              </>
            ) : (
              <StatTile
                title="Recent matches"
                stat="—"
                subtitle="No recent match data available"
                icon={Activity}
              />
            )}
          </>
        )}
      </div>

      {recentMatches.length > 0 && (
        <Card className="overflow-hidden border-border/60 bg-card/45 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 py-3">
            <div>
              <CardTitle className="text-sm">Recent matches</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                A glimpse of the latest games
              </p>
            </div>
            <Link
              href={`/players/${id}/matches`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Match history{" "}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 pb-4 sm:grid-cols-3 xl:grid-cols-6">
            {recentMatches.map((match, index) => (
              <div
                key={`${match.match_id}-${index}`}
                className="flex min-w-0 items-center gap-2 rounded-xl border border-border/50 bg-background/70 p-2"
              >
                <Image
                  src={match.image}
                  alt=""
                  width={64}
                  height={36}
                  className="h-9 w-16 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">{match.name}</p>
                  <p
                    className={`truncate text-[0.65rem] font-medium ${match.result === "Won" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                  >
                    {match.result} · {match.duration}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
