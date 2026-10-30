"use client";
import { use } from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePlayerMatches } from "@/hooks/usePlayer";
import { Activity, Clock3, Trophy } from "lucide-react";

import { columns } from "./columns";
import { AnimatePresence, motion } from "framer-motion";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data, isLoading, isError } = usePlayerMatches(params.id);
  const matches = data ?? [];
  const recentMatches = matches.slice(0, 20);
  const recentWins = recentMatches.filter(
    (match) => match.result === "Won",
  ).length;
  const recentWinRate = recentMatches.length
    ? (recentWins / recentMatches.length) * 100
    : 0;
  const averageKda = (field: "kills" | "deaths" | "assists") =>
    recentMatches.length
      ? recentMatches.reduce((sum, match) => sum + match[field], 0) /
        recentMatches.length
      : 0;
  const kda = `${averageKda("kills").toFixed(1)} / ${averageKda("deaths").toFixed(1)} / ${averageKda("assists").toFixed(1)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full space-y-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Match log
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Match history
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review results and performance from recent games.
            </p>
          </div>
          <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {isLoading
              ? "Loading matches…"
              : `${matches.length.toLocaleString()} matches`}
          </span>
        </div>

        {!isLoading && !isError && recentMatches.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              icon={Trophy}
              label="Recent record"
              value={`${recentWins}W – ${recentMatches.length - recentWins}L`}
              detail={`Last ${recentMatches.length} matches`}
            />
            <SummaryCard
              icon={Activity}
              label="Recent win rate"
              value={`${recentWinRate.toFixed(1)}%`}
              detail="Last 20 matches"
            />
            <SummaryCard
              icon={Clock3}
              label="Average K / D / A"
              value={kda}
              detail="Last 20 matches"
            />
          </div>
        )}

        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">All matches</CardTitle>
            <p className="text-sm text-muted-foreground">
              Search by hero, sort columns, and page through match history.
            </p>
          </CardHeader>
          <CardContent>
            {isError ? (
              <p className="py-10 text-center text-sm text-destructive">
                Could not load match history. Please try again.
              </p>
            ) : (
              <DataTable
                columns={columns}
                data={matches}
                filterPlaceholder="Search matches by hero..."
                pageSize={10}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card size="sm" className="bg-card/70">
      <CardContent className="flex items-center gap-3 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <p className="truncate text-lg font-bold tabular-nums">{value}</p>
          <p className="truncate text-xs text-muted-foreground">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
