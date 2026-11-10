"use client";

import { MapPinned } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberValue } from "./config";
import { NoData } from "./no-data";

export function WardMapView({ data }: { data: unknown }) {
  if (!data || typeof data !== "object")
    return <NoData message="Ward placements are not available." />;
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
