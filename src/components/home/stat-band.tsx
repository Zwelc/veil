import type { IProScene } from "@/models/scene";

const n = (value: number) => value.toLocaleString("en-US");

/** Scoreboard strip along the bottom of the hero. Server component. */
export default function StatBand({ scene }: { scene: IProScene }) {
  const stats = [
    { value: scene.activeWeek, label: "pros played in the last 7 days" },
    { value: scene.activeMonth, label: "played in the last 30 days" },
    { value: scene.countriesMonth, label: "countries this month" },
    { value: scene.listed, label: "players on OpenDota's pro list" },
  ];

  return (
    <div className="relative border-t border-border bg-background/90">
      {/* 1px gaps over a border-coloured grid draw the dividers between cells. */}
      <dl className="container mx-auto grid grid-cols-2 gap-px bg-border px-0 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-1 bg-background px-4 py-5 sm:px-6"
          >
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="font-display text-4xl leading-none font-extrabold tabular-nums sm:text-5xl">
              {n(stat.value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
