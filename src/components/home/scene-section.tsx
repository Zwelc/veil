import { RevealBlock } from "@/components/motion/reveal";
import { countryName } from "@/lib/dota";
import type { IProScene } from "@/models/scene";
import SceneBars from "./scene-bars";

/**
 * Where this month's pros play from. Server component: the numbers are in the
 * static HTML; only the bar motion is client. Countries are self-reported on
 * Steam, which the copy says plainly (some players set joke locations).
 */
export default function SceneSection({ scene }: { scene: IProScene }) {
  const top = scene.topCountries[0]?.count ?? 0;
  if (!top) return null;
  const rows = scene.topCountries.map(({ code, count }) => ({
    label: countryName(code),
    count,
    share: count / top,
  }));

  return (
    <section
      aria-labelledby="scene-heading"
      className="flex flex-wrap items-start gap-x-12 gap-y-8"
    >
      <RevealBlock className="flex min-w-0 flex-[1_1_22rem] flex-col gap-3">
        <h2
          id="scene-heading"
          className="font-display text-4xl leading-none font-extrabold text-balance uppercase sm:text-5xl"
        >
          Where this month&apos;s pros play from
        </h2>
        <p className="max-w-prose text-pretty text-muted-foreground">
          {scene.activeMonth.toLocaleString("en-US")} players on OpenDota&apos;s
          pro list played in the last 30 days, across{" "}
          {scene.countriesMonth.toLocaleString("en-US")} countries. Country is
          whatever each player set on Steam.
        </p>
      </RevealBlock>
      <div className="min-w-0 flex-[1_1_30rem]">
        <SceneBars rows={rows} />
      </div>
    </section>
  );
}
