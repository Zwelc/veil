"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroes } from "dotaconstants";
import {
  Activity,
  BarChart3,
  Crown,
  Flame,
  MapPinned,
  RefreshCw,
  UsersRound,
} from "lucide-react";
import {
  PLAYER_HISTOGRAM_FIELDS,
  refreshPlayerData,
  usePlayerEndpoint,
} from "@/hooks/usePlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Endpoint =
  | "peers"
  | "pros"
  | "histograms"
  | "wardmap"
  | "wordcloud"
  | "ratings"
  | "rankings";
type Row = Record<string, unknown>;

const endpoints: { value: Endpoint; label: string; description: string }[] = [
  {
    value: "peers",
    label: "Teammates",
    description: "Players you have shared matches with",
  },
  {
    value: "pros",
    label: "Pro teammates",
    description: "Professional players from your matches",
  },
  {
    value: "histograms",
    label: "Stat trends",
    description: "How your match stats are distributed",
  },
  {
    value: "wardmap",
    label: "Ward map",
    description: "Your observer and sentry placements",
  },
  {
    value: "wordcloud",
    label: "Chat words",
    description: "Words recorded from your matches",
  },
  {
    value: "ratings",
    label: "Rank history",
    description: "Recorded medal changes",
  },
  {
    value: "rankings",
    label: "Hero rankings",
    description: "Your hero leaderboard scores",
  },
];

const fieldLabel = (field: string) =>
  field.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const numberValue = (value: unknown) =>
  typeof value === "number" ? value : Number(value) || 0;
const dateLabel = (timestamp: unknown) => {
  const seconds = numberValue(timestamp);
  return seconds > 0
    ? new Date(seconds * 1000).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "—";
};

function asRows(data: unknown): Row[] {
  return Array.isArray(data)
    ? data.filter(
        (item): item is Row => item !== null && typeof item === "object",
      )
    : [];
}

export default function PlayerInsights({ id }: { id: string }) {
  const [endpoint, setEndpoint] = useState<Endpoint>("peers");
  const [histogramField, setHistogramField] = useState<string>(
    PLAYER_HISTOGRAM_FIELDS[0],
  );
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");
  const path =
    endpoint === "histograms" ? `histograms/${histogramField}` : endpoint;
  const { data, isLoading, isError } = usePlayerEndpoint<unknown>(id, path);
  const selected = endpoints.find((item) => item.value === endpoint)!;
  const rows = asRows(data);

  async function handleRefresh() {
    setRefreshing(true);
    setRefreshMessage("");
    try {
      await refreshPlayerData(id);
      setRefreshMessage(
        "Refresh requested. Player data will update when OpenDota completes processing.",
      );
    } catch (error) {
      setRefreshMessage(
        error instanceof Error
          ? error.message
          : "Unable to refresh this player.",
      );
    } finally {
      setRefreshing(false);
    }
  }

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
            onClick={handleRefresh}
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
              items={endpoints}
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
                {endpoints.map((item) => (
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
                  label: fieldLabel(field),
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
                      {fieldLabel(field)}
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

function PeopleView({ rows, pros }: { rows: Row[]; pros: boolean }) {
  const [search, setSearch] = useState("");
  const people = rows.filter((person) => {
    const haystack = [
      person.personaname,
      person.name,
      person.team_name,
      person.team_tag,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(search.toLowerCase());
  });
  const shown = people.slice(0, 24);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle>
            {pros ? "Pro players from your matches" : "Frequent teammates"}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {pros
              ? `${rows.length} professional player${rows.length === 1 ? "" : "s"} found`
              : `${rows.length.toLocaleString()} players, sorted by games together`}
          </p>
        </div>
        <Input
          aria-label="Search players"
          placeholder="Search players or teams..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-background/70 sm:max-w-xs"
        />
      </CardHeader>
      <CardContent>
        {shown.length === 0 ? (
          <EmptyState message="No players match your search." />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((person, index) => (
              <PersonCard
                key={`${person.account_id}-${index}`}
                person={person}
                pros={pros}
                rank={index + 1}
              />
            ))}
          </div>
        )}
        {people.length > shown.length && (
          <p className="pt-4 text-center text-xs text-muted-foreground">
            Showing {shown.length} of {people.length.toLocaleString()} matches.
            Refine your search to find other players.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PersonCard({
  person,
  pros,
  rank,
}: {
  person: Row;
  pros: boolean;
  rank: number;
}) {
  const games = numberValue(person.games);
  const wins = numberValue(person.win);
  const winRate = games ? (wins / games) * 100 : 0;
  const displayName = String(
    person.personaname || person.name || `Player ${person.account_id ?? ""}`,
  );
  const avatar = String(person.avatarfull || person.avatar || "");
  const target = Number(person.account_id);

  return (
    <Card
      size="sm"
      className="bg-background/65 shadow-none transition-colors hover:border-primary/25 hover:bg-background"
    >
      <CardContent className="flex items-center gap-3 py-3">
        {!pros && (
          <span className="w-7 shrink-0 text-center text-xs font-semibold text-muted-foreground tabular-nums">
            #{rank}
          </span>
        )}
        <Avatar className="size-11 rounded-xl">
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>
            {displayName.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-sm font-semibold">
              {!pros && Number.isSafeInteger(target) && target > 0 ? (
                <Link
                  className="hover:text-primary"
                  href={`/players/${target}`}
                >
                  {displayName}
                </Link>
              ) : (
                displayName
              )}
            </p>
            {pros && Boolean(person.team_tag) && (
              <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary">
                {String(person.team_tag)}
              </span>
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {pros
              ? String(
                  person.team_name ||
                    person.country_code ||
                    "Professional player",
                )
              : `${games.toLocaleString()} games together · ${dateLabel(person.last_played)}`}
          </p>
          {games > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              {wins.toLocaleString()} wins ·{" "}
              <span className="font-semibold text-foreground">
                {winRate.toFixed(1)}%
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function HistogramView({ rows, field }: { rows: Row[]; field: string }) {
  const points = [...rows]
    .filter((point) => numberValue(point.games) > 0)
    .sort((a, b) => numberValue(a.x) - numberValue(b.x));
  const maxGames = Math.max(
    1,
    ...points.map((point) => numberValue(point.games)),
  );
  const totalGames = points.reduce(
    (sum, point) => sum + numberValue(point.games),
    0,
  );
  const totalWins = points.reduce(
    (sum, point) => sum + numberValue(point.win),
    0,
  );
  const tickStep = Math.max(1, Math.ceil(points.length / 10));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SummaryMetric
          icon={BarChart3}
          label="Matches represented"
          value={totalGames.toLocaleString()}
        />
        <SummaryMetric
          icon={Flame}
          label="Average win rate"
          value={`${totalGames ? ((totalWins / totalGames) * 100).toFixed(1) : "0.0"}%`}
        />
        <SummaryMetric
          icon={Activity}
          label="Stat"
          value={fieldLabel(field)}
          className="col-span-2 sm:col-span-1"
        />
      </div>
      {points.length === 0 ? (
        <EmptyState message="No distribution data is available for this stat." />
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{fieldLabel(field)} distribution</CardTitle>
            <p className="text-sm text-muted-foreground">
              Each bar shows matches in a stat bucket. Hover or focus a bar for
              its win rate.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-1 border-b border-border/70 px-1 pt-6 sm:gap-1.5">
              {points.map((point, index) => {
                const games = numberValue(point.games);
                const wins = numberValue(point.win);
                const winRate = games ? wins / games : 0;
                const height = Math.max(2, (games / maxGames) * 100);
                return (
                  <div
                    key={`${point.x}-${index}`}
                    role="img"
                    tabIndex={0}
                    aria-label={`${fieldLabel(field)} ${String(point.x)}: ${games} matches, ${(winRate * 100).toFixed(1)} percent wins`}
                    className="group/bar relative flex h-full min-w-0 flex-1 flex-col justify-end outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    title={`${fieldLabel(field)} ${String(point.x)}: ${games} matches · ${(winRate * 100).toFixed(1)}% wins`}
                  >
                    <div
                      className="w-full rounded-t-sm bg-primary/25 transition-colors group-hover/bar:bg-primary/45"
                      style={{ height: `${height}%` }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-primary"
                      style={{
                        opacity: winRate,
                        height: `${Math.max(3, winRate * 5)}px`,
                      }}
                    />
                    {index % tickStep === 0 && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] text-muted-foreground tabular-nums">
                        {String(point.x)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex items-center justify-between text-xs text-muted-foreground">
              <span>Stat value bucket</span>
              <span>Games per bucket</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function WardMapView({ data }: { data: unknown }) {
  if (!data || typeof data !== "object")
    return <EmptyState message="Ward placements are not available." />;
  const wardMap = data as Record<
    string,
    Record<string, Record<string, number>>
  >;
  const coordinates = Object.values(wardMap).flatMap((side) =>
    Object.entries(side).flatMap(([x, yValues]) =>
      Object.keys(yValues).map((y) => ({
        x: numberValue(x),
        y: numberValue(y),
      })),
    ),
  );
  const bounds = coordinates.length
    ? {
        minX: Math.min(...coordinates.map((point) => point.x)),
        maxX: Math.max(...coordinates.map((point) => point.x)),
        minY: Math.min(...coordinates.map((point) => point.y)),
        maxY: Math.max(...coordinates.map((point) => point.y)),
      }
    : { minX: 0, maxX: 255, minY: 0, maxY: 255 };
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <WardHeatmap
        title="Observer wards"
        data={wardMap.obs ?? {}}
        bounds={bounds}
        icon={MapPinned}
      />
      <WardHeatmap
        title="Sentry wards"
        data={wardMap.sen ?? {}}
        bounds={bounds}
        icon={MapPinned}
      />
    </div>
  );
}

function WardHeatmap({
  title,
  data,
  bounds,
  icon: Icon,
}: {
  title: string;
  data: Record<string, Record<string, number>>;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  icon: typeof MapPinned;
}) {
  const size = 32;
  const cells = Array.from({ length: size * size }, () => 0);
  const padding = 2;
  for (const [rawX, yValues] of Object.entries(data)) {
    for (const [rawY, rawCount] of Object.entries(yValues)) {
      const xRange = Math.max(1, bounds.maxX - bounds.minX);
      const yRange = Math.max(1, bounds.maxY - bounds.minY);
      const x = Math.min(
        size - 1 - padding,
        Math.max(
          padding,
          padding +
            Math.floor(
              ((numberValue(rawX) - bounds.minX) / xRange) *
                (size - 1 - padding * 2),
            ),
        ),
      );
      const y = Math.min(
        size - 1 - padding,
        Math.max(
          padding,
          padding +
            Math.floor(
              ((numberValue(rawY) - bounds.minY) / yRange) *
                (size - 1 - padding * 2),
            ),
        ),
      );
      cells[y * size + x] += numberValue(rawCount);
    }
  }
  const max = Math.max(1, ...cells);
  const total = cells.reduce((sum, value) => sum + value, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {total.toLocaleString()} recorded placements
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">North ↑</span>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label={`${title} heat map with ${total} placements`}
          className="mx-auto grid aspect-square w-full max-w-[25rem] gap-px overflow-hidden rounded-xl border border-border/60 bg-border/50 p-px"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {cells.map((count, index) => (
            <span
              key={index}
              className="rounded-[1px]"
              style={{
                backgroundColor: count
                  ? `rgba(124, 58, 237, ${0.12 + (count / max) * 0.82})`
                  : "var(--color-card)",
              }}
            />
          ))}
        </div>
        <div className="mx-auto mt-3 flex max-w-[25rem] items-center justify-between text-[0.65rem] text-muted-foreground">
          <span>West</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            {[0.12, 0.32, 0.56, 0.8, 0.98].map((opacity) => (
              <i
                key={opacity}
                className="size-2.5 rounded-sm"
                style={{ backgroundColor: `rgba(124, 58, 237, ${opacity})` }}
              />
            ))}
            <span>More</span>
          </div>
          <span>East</span>
        </div>
      </CardContent>
    </Card>
  );
}

function WordCloudView({ data }: { data: unknown }) {
  const [source, setSource] = useState<"my_word_counts" | "all_word_counts">(
    "my_word_counts",
  );
  const cloud =
    data && typeof data === "object"
      ? (data as Record<string, unknown>)[source]
      : undefined;
  const allWords =
    cloud && typeof cloud === "object"
      ? Object.entries(cloud as Record<string, unknown>)
          .map(([word, count]) => ({ word, count: numberValue(count) }))
          .sort((a, b) => b.count - a.count)
      : [];
  const words = allWords.slice(0, 48);
  const max = Math.max(1, ...words.map((item) => item.count));
  const total = allWords.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Words from match chat</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Word size reflects how often it appears in the available chat log.
          </p>
        </div>
        <div className="flex rounded-xl border border-border/70 bg-muted/40 p-1">
          <Button
            size="sm"
            variant={source === "my_word_counts" ? "secondary" : "ghost"}
            onClick={() => setSource("my_word_counts")}
          >
            Your words
          </Button>
          <Button
            size="sm"
            variant={source === "all_word_counts" ? "secondary" : "ghost"}
            onClick={() => setSource("all_word_counts")}
          >
            All chat
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {words.length === 0 ? (
          <EmptyState message="No chat words are available for this selection." />
        ) : (
          <>
            <p className="mb-4 text-xs text-muted-foreground">
              Top {words.length} of {allWords.length.toLocaleString()} words ·{" "}
              {total.toLocaleString()} occurrences counted
            </p>
            <div className="flex min-h-56 flex-wrap content-center items-center justify-center gap-2 rounded-2xl border border-border/60 bg-muted/20 p-5 sm:gap-3 sm:p-8">
              {words.map(({ word, count }, index) => (
                <span
                  key={word}
                  title={`${word}: ${count}`}
                  className={cn(
                    "rounded-full border border-primary/10 bg-card/80 px-3 py-1.5 text-primary shadow-sm",
                    index < 3 && "bg-primary/10 font-bold",
                  )}
                  style={{
                    fontSize: `${0.75 + (count / max) * 0.9}rem`,
                    opacity: 0.65 + (count / max) * 0.35,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RatingsView({ rows }: { rows: Row[] }) {
  if (!rows.length)
    return (
      <EmptyState
        icon={Crown}
        title="No rank history yet"
        message="OpenDota has not recorded a medal update for this account."
      />
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank history</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recorded rank updates, newest first.
        </p>
      </CardHeader>
      <CardContent>
        <ol className="relative ml-3 space-y-4 border-l border-border/70 pl-6">
          {[...rows]
            .sort((a, b) => numberValue(b.time) - numberValue(a.time))
            .map((row, index) => (
              <li
                key={`${row.time}-${index}`}
                className="relative rounded-xl border border-border/60 bg-background/65 p-4"
              >
                <span className="absolute -left-[1.95rem] top-5 size-3 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    Rank tier {numberValue(row.rank_tier)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dateLabel(row.time)}
                  </p>
                </div>
                {numberValue(row.match_id) > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Match #{String(row.match_id)}
                  </p>
                )}
              </li>
            ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function RankingsView({ rows }: { rows: Row[] }) {
  const [showAll, setShowAll] = useState(false);
  const rankingRows = [...rows].sort(
    (a, b) => numberValue(b.percent_rank) - numberValue(a.percent_rank),
  );
  const visibleRows = showAll ? rankingRows : rankingRows.slice(0, 12);
  if (!rankingRows.length)
    return (
      <EmptyState
        icon={Crown}
        title="No hero rankings available"
        message="There are no leaderboard records for this account yet."
      />
    );
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div>
          <CardTitle>Hero leaderboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your strongest ranked heroes, sorted by percentile.
          </p>
        </div>
        {rankingRows.length > 12 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show top 12" : `Show all ${rankingRows.length}`}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visibleRows.map((row, index) => {
            const hero = (
              heroes as Record<
                string,
                { localized_name?: string; img?: string }
              >
            )[String(row.hero_id)];
            const name = hero?.localized_name ?? `Hero ${String(row.hero_id)}`;
            return (
              <Card
                key={`${row.hero_id}-${index}`}
                size="sm"
                className="relative overflow-hidden bg-background/65 shadow-none"
              >
                {hero?.img && (
                  <Image
                    src={`https://cdn.cloudflare.steamstatic.com${hero.img.replace(/\?$/, "")}`}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="object-cover opacity-15"
                  />
                )}
                <CardContent className="relative flex items-center gap-3 py-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    #{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      Score{" "}
                      {Math.round(numberValue(row.score)).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold tabular-nums">
                      {(numberValue(row.percent_rank) * 100).toFixed(1)}%
                    </p>
                    <p className="text-[0.65rem] text-muted-foreground">
                      percentile
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <Card size="sm" className={cn("bg-card/70", className)}>
      <CardContent className="flex items-center gap-3 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-lg font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({
  icon: Icon = UsersRound,
  title = "No data found",
  message,
}: {
  icon?: typeof UsersRound;
  title?: string;
  message: string;
}) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </span>
        <p className="mt-4 font-semibold">{title}</p>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
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
