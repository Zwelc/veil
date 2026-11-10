import { RevealBlock, RevealList } from "@/components/motion/reveal";
import FeatureTile from "./feature-tile";

/** The player page tabs, in their real order (the numbers are the tab order). */
const FEATURES = [
  {
    title: "Overview",
    description: "Lifetime win rate, recent form and average K/D/A, GPM and XPM.",
  },
  {
    title: "Match History",
    description: "Every recorded game with hero, result, KDA and duration.",
  },
  {
    title: "Heroes",
    description: "Games and win rate on each hero, filterable by period.",
  },
  {
    title: "Totals",
    description: "Lifetime combat, farm, damage and utility numbers.",
  },
  {
    title: "Insights",
    description: "Teammates, ward maps, chat words, rank history and hero rankings.",
  },
];

/** What's on every player profile. Server component; only the motion wrappers are client. */
export default function FeatureStrip() {
  return (
    <section aria-labelledby="features-heading" className="flex flex-col gap-4">
      <RevealBlock>
        <h2
          id="features-heading"
          className="font-display text-4xl leading-none font-extrabold uppercase sm:text-5xl"
        >
          Five tabs on every profile
        </h2>
      </RevealBlock>
      <RevealList step={0.07} className="flex flex-col">
        {FEATURES.map(({ title, description }, i) => (
          <FeatureTile
            key={title}
            number={String(i + 1).padStart(2, "0")}
            title={title}
            description={description}
          />
        ))}
      </RevealList>
    </section>
  );
}
