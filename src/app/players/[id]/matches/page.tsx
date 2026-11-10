"use client";
import { use } from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePlayerMatches } from "@/hooks/usePlayer";
import { Activity, Clock3, Trophy } from "lucide-react";
import { HeaderBadge, PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/tiles/metric-card";
import { summarizeMatches } from "@/lib/dota";

import { columns } from "./columns";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data, isLoading, isError } = usePlayerMatches(params.id);
  const matches = data ?? [];
  const recent = summarizeMatches(matches.slice(0, 20));

  return (
    <div className="w-full space-y-5">
        <PageHeader
          eyebrow="Match log"
          title="Match history"
          description="Review results and performance from recent games."
          aside={
            <HeaderBadge>
              {isLoading
                ? "Loading matches…"
                : `${matches.length.toLocaleString()} matches`}
            </HeaderBadge>
          }
        />

        {!isLoading && !isError && recent.count > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MetricCard
              icon={Trophy}
              label="Recent record"
              value={`${recent.wins}W – ${recent.losses}L`}
              detail={`Last ${recent.count} matches`}
            />
            <MetricCard
              icon={Activity}
              label="Recent win rate"
              value={`${recent.winRate.toFixed(1)}%`}
              detail="Last 20 matches"
            />
            <MetricCard
              icon={Clock3}
              label="Average K / D / A"
              value={recent.averageKda}
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
              <p role="alert" className="py-10 text-center text-sm text-destructive">
                Could not load match history. Please try again.
              </p>
            ) : (
              <DataTable
                columns={columns}
                data={matches}
                loading={isLoading}
                filterPlaceholder="Search matches by hero..."
                pageSize={10}
              />
            )}
          </CardContent>
        </Card>
    </div>
  );
}

