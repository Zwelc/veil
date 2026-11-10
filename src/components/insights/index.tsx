"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { usePlayerInsight, useRefreshPlayer } from "@/hooks/usePlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { titleCase } from "@/lib/dota";
import { PLAYER_HISTOGRAM_FIELDS, ENDPOINTS, asRows, type Endpoint, type Row } from "./config";
import { PeopleView } from "./people-view";
import { HistogramView } from "./histogram-view";
import { WardMapView } from "./ward-map-view";
import { WordCloudView } from "./word-cloud-view";
import { RatingsView } from "./ratings-view";
import { RankingsView } from "./rankings-view";

export default function PlayerInsights({ id }: { id: string }) {
  const [endpoint, setEndpoint] = useState<Endpoint>("peers");
  const [histogramField, setHistogramField] = useState<string>(
    PLAYER_HISTOGRAM_FIELDS[0],
  );
  const path =
    endpoint === "histograms" ? `histograms/${histogramField}` : endpoint;
  const { data, isLoading, isError } = usePlayerInsight(id, path);
  const refresh = useRefreshPlayer(id);
  const refreshing = refresh.isPending;
  const refreshMessage = refresh.isSuccess
    ? "Refresh requested. Player data will update when OpenDota completes processing."
    : refresh.isError
      ? refresh.error.message
      : "";
  const selected = ENDPOINTS.find((item) => item.value === endpoint)!;
  const rows = asRows(data);

  return (
    <div className="space-y-5">
      <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-card via-card to-primary/[0.05]">
        <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Beyond the basics
            </p>
            <CardTitle className="mt-1 text-2xl sm:text-3xl">
              Player insights
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore teammates, trends, map activity, and hero rankings.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => refresh.mutate()}
            disabled={refreshing}
            className="shrink-0"
          >
            <RefreshCw
              aria-hidden="true"
              className={cn("size-4", refreshing && "animate-spin")}
            />
            {refreshing ? "Requesting…" : "Refresh OpenDota data"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select
              items={ENDPOINTS}
              value={endpoint}
              onValueChange={(value) => value && setEndpoint(value as Endpoint)}
            >
              <SelectTrigger
                aria-label="Insight category"
                className="w-full bg-background/70 sm:w-64"
              >
                <SelectValue placeholder="Choose an insight" />
              </SelectTrigger>
              <SelectContent>
                {ENDPOINTS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {endpoint === "histograms" && (
              <Select
                items={PLAYER_HISTOGRAM_FIELDS.map((field) => ({
                  value: field,
                  label: titleCase(field),
                }))}
                value={histogramField}
                onValueChange={(value) => value && setHistogramField(value)}
              >
                <SelectTrigger
                  aria-label="Histogram statistic"
                  className="w-full bg-background/70 sm:w-56"
                >
                  <SelectValue placeholder="Choose a statistic" />
                </SelectTrigger>
                <SelectContent>
                  {PLAYER_HISTOGRAM_FIELDS.map((field) => (
                    <SelectItem key={field} value={field}>
                      {titleCase(field)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {selected.description}
            </p>
            {refreshMessage && (
              <p role="status" className="text-xs text-muted-foreground">
                {refreshMessage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <InsightsSkeleton />
      ) : isError ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="font-semibold">
              Insights are temporarily unavailable
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              OpenDota could not return this dataset. Try another category or
              come back later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <InsightView
          endpoint={endpoint}
          field={histogramField}
          data={data}
          rows={rows}
        />
      )}
    </div>
  );
}

function InsightView({
  endpoint,
  field,
  data,
  rows,
}: {
  endpoint: Endpoint;
  field: string;
  data: unknown;
  rows: Row[];
}) {
  switch (endpoint) {
    case "peers":
      return <PeopleView rows={rows} pros={false} />;
    case "pros":
      return <PeopleView rows={rows} pros />;
    case "histograms":
      return <HistogramView rows={rows} field={field} />;
    case "wardmap":
      return <WardMapView data={data} />;
    case "wordcloud":
      return <WordCloudView data={data} />;
    case "ratings":
      return <RatingsView rows={rows} />;
    case "rankings":
      return <RankingsView rows={rows} />;
  }
}

function InsightsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}
