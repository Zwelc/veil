"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Block from "./block";
import {
  Activity,
  Coins,
  Crosshair,
  Gauge,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export default function StatTile({
  title,
  stat,
  subtitle,
  icon,
  accent = "default",
  progress,
}: {
  title: string;
  stat: string;
  subtitle?: string;
  icon?: LucideIcon;
  accent?: "default" | "success" | "warning";
  progress?: number;
}) {
  const Icon =
    icon ??
    (title.toLowerCase().includes("gold")
      ? Coins
      : title.toLowerCase().includes("xp")
        ? Gauge
        : title.toLowerCase().includes("k / d")
          ? Crosshair
          : title.toLowerCase().includes("win")
            ? Trophy
            : Activity);
  const iconTone =
    accent === "success"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : accent === "warning"
        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        : "bg-primary/10 text-primary";

  return (
    <Block>
      <Card className="h-full w-full border-border/60 bg-card/75 shadow-none transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-card hover:shadow-md hover:shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-0">
          <CardTitle className="line-clamp-2 text-xs font-medium leading-relaxed text-muted-foreground md:text-sm">
            {title}
          </CardTitle>
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${iconTone}`}
          >
            <Icon aria-hidden="true" className="size-4" />
          </span>
        </CardHeader>
        <CardContent className="mt-auto pt-2">
          <div className="truncate text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
            {stat}
          </div>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
          {progress !== undefined && (
            <div
              role="progressbar"
              aria-label={`${title} ${Math.round(progress)} percent`}
              aria-valuenow={Math.round(Math.min(100, Math.max(0, progress)))}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
            >
              <div
                className={`h-full rounded-full transition-[width] ${accent === "success" ? "bg-emerald-500" : "bg-primary"}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Block>
  );
}
