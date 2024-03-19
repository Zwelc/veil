import HeroList from "./hero-list";

import RecentList from "@/components/recent-list";
import TotalsTiles from "./totals-tiles";
import WinrateTiles from "./winrate-tiles";
import SidesChart from "./side-chart";
import PatchOverviewChart from "./patch-overview";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="row-span-2 md:row-span-6 col-span-2 md:col-span-6 h-full w-full">
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-6 grid-rows-6 gap-2">
        <WinrateTiles id={params.id} />
        <TotalsTiles id={params.id} />
        <HeroList id={params.id} />
        <PatchOverviewChart id={params.id} />
        <RecentList id={params.id} />
      </div>
    </div>
  );
}
