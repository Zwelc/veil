"use client";

import { use } from "react";
import {
  Activity,
  Coins,
  Crosshair,
  Gauge,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTotals } from "@/hooks/usePlayer";
import type { ITotal } from "@/models/totals";

type StatDefinition = {
  label: string;
  category: string;
  icon: LucideIcon;
  format?: (average: number) => string;
  unit?: string;
};

const definitions: Record<string, StatDefinition> = {
  kills: { label: "Kills", category: "Combat", icon: Crosshair },
  deaths: { label: "Deaths", category: "Combat", icon: HeartPulse },
  assists: { label: "Assists", category: "Combat", icon: Activity },
  kda: {
    label: "KDA ratio",
    category: "Combat",
    icon: Crosshair,
    format: (value) => `${value.toFixed(2)}×`,
  },
  stuns: {
    label: "Stun duration",
    category: "Combat",
    icon: Activity,
    unit: "sec / match",
  },
  gold_per_min: {
    label: "Gold per minute",
    category: "Farm & progression",
    icon: Coins,
    format: (value) => Math.round(value).toLocaleString(),
    unit: "GPM",
  },
  xp_per_min: {
    label: "XP per minute",
    category: "Farm & progression",
    icon: Gauge,
    format: (value) => Math.round(value).toLocaleString(),
    unit: "XPM",
  },
  last_hits: {
    label: "Last hits",
    category: "Farm & progression",
    icon: Coins,
  },
  denies: { label: "Denies", category: "Farm & progression", icon: Coins },
  lane_efficiency_pct: {
    label: "Lane efficiency",
    category: "Farm & progression",
    icon: Gauge,
    format: (value) => `${value.toFixed(1)}%`,
  },
  duration: {
    label: "Match duration",
    category: "Farm & progression",
    icon: Activity,
    format: (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = Math.round(value % 60);
      return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
    },
    unit: "per match",
  },
  level: {
    label: "Final level",
    category: "Farm & progression",
    icon: Gauge,
    format: (value) => value.toFixed(1),
    unit: "average",
  },
  hero_damage: {
    label: "Hero damage",
    category: "Match impact",
    icon: Crosshair,
    format: (value) => compactNumber(value),
    unit: "per match",
  },
  tower_damage: {
    label: "Tower damage",
    category: "Match impact",
    icon: Crosshair,
    format: (value) => compactNumber(value),
    unit: "per match",
  },
  hero_healing: {
    label: "Hero healing",
    category: "Match impact",
    icon: HeartPulse,
    format: (value) => compactNumber(value),
    unit: "per match",
  },
  tower_kills: {
    label: "Tower kills",
    category: "Match impact",
    icon: Crosshair,
  },
  neutral_kills: {
    label: "Neutral kills",
    category: "Match impact",
    icon: Crosshair,
  },
  courier_kills: {
    label: "Courier kills",
    category: "Match impact",
    icon: Crosshair,
  },
  purchase_tpscroll: {
    label: "Town Portal Scrolls",
    category: "Items & utility",
    icon: Coins,
  },
  purchase_ward_observer: {
    label: "Observer wards",
    category: "Items & utility",
    icon: Gauge,
  },
  purchase_ward_sentry: {
    label: "Sentry wards",
    category: "Items & utility",
    icon: Gauge,
  },
  purchase_gem: {
    label: "Gems purchased",
    category: "Items & utility",
    icon: Coins,
  },
  purchase_rapier: {
    label: "Divine Rapiers",
    category: "Items & utility",
    icon: Coins,
  },
  pings: { label: "Pings", category: "Items & utility", icon: Activity },
  actions_per_min: {
    label: "Actions per minute",
    category: "Items & utility",
    icon: Activity,
    format: (value) => Math.round(value).toLocaleString(),
    unit: "APM",
  },
  throw: {
    label: "Throw value",
    category: "Match swings",
    icon: Activity,
    format: (value) => compactNumber(value),
    unit: "average gold value",
  },
  comeback: {
    label: "Comeback value",
    category: "Match swings",
    icon: Activity,
    format: (value) => compactNumber(value),
    unit: "average gold value",
  },
  stomp: {
    label: "Stomp value",
    category: "Match swings",
    icon: Activity,
    format: (value) => compactNumber(value),
    unit: "average gold value",
  },
  loss: {
    label: "Loss value",
    category: "Match swings",
    icon: Activity,
    format: (value) => compactNumber(value),
    unit: "average gold value",
  },
};

const categoryOrder = [
  "Combat",
  "Farm & progression",
  "Match impact",
  "Items & utility",
  "Match swings",
  "Other",
];

function compactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function titleCase(field: string) {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StatCard({ entry }: { entry: ITotal }) {
  const definition = definitions[entry.field];
  const average = entry.n > 0 ? entry.sum / entry.n : 0;
  const Icon = definition?.icon ?? Activity;
  const value = definition?.format
    ? definition.format(average)
    : average.toFixed(1);

  return (
    <Card
      size="sm"
      className="min-w-0 border-border/60 bg-background/65 shadow-none transition-colors hover:border-primary/25 hover:bg-background"
    >
      <CardContent className="flex min-h-25 items-center gap-3 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {definition?.label ?? titleCase(entry.field)}
          </p>
          <div className="mt-1 flex min-w-0 items-baseline gap-2">
            <p className="truncate text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
              {value}
            </p>
            {definition?.unit === "GPM" || definition?.unit === "XPM" ? (
              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
                {definition.unit}
              </span>
            ) : null}
          </div>
          <p className="mt-1 truncate text-[0.7rem] text-muted-foreground/80">
            {definition?.unit &&
            definition.unit !== "GPM" &&
            definition.unit !== "XPM"
              ? definition.unit
              : `${entry.n.toLocaleString()} matches sampled`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const { data, isLoading, isError } = useTotals(id);
  const entries = (data ?? []).filter((entry) => entry.n > 0);
  const grouped = categoryOrder
    .map((category) => ({
      category,
      entries: entries.filter(
        (entry) => (definitions[entry.field]?.category ?? "Other") === category,
      ),
    }))
    .filter((group) => group.entries.length > 0);
  const matchCount = Math.max(0, ...entries.map((entry) => entry.n));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Lifetime performance
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Player totals
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Per-match averages across the player’s parsed match history.
          </p>
        </div>
        {!isLoading && !isError && entries.length > 0 && (
          <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            Up to {matchCount.toLocaleString()} matches sampled
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="space-y-3 rounded-2xl border border-border/60 p-4"
            >
              <Skeleton className="h-5 w-36" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }, (_, cardIndex) => (
                  <Skeleton key={cardIndex} className="h-25 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Could not load player totals. Please try again.
          </CardContent>
        </Card>
      ) : grouped.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No totals are available for this player yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {grouped.map(({ category, entries: categoryEntries }) => (
            <section
              key={category}
              aria-labelledby={`totals-${category.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
              className="rounded-2xl border border-border/60 bg-card/35 p-3 sm:p-4"
            >
              <CardHeader className="mb-3 flex flex-row items-center justify-between gap-3 px-1 py-1">
                <div>
                  <CardTitle
                    id={`totals-${category.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                    className="text-base"
                  >
                    {category}
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {categoryEntries.length}{" "}
                    {categoryEntries.length === 1 ? "stat" : "stats"}
                  </p>
                </div>
              </CardHeader>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categoryEntries.map((entry) => (
                  <StatCard key={entry.field} entry={entry} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
