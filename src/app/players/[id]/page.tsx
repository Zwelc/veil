import HeroList from "./hero-list";

import RecentList from "@/components/recent-list";
import TotalsTiles from "./totals-tiles";
import WinrateTiles from "./winrate-tiles";
import SidesChart from "./side-chart";
import PatchOverviewChart from "./patch-overview";
import PlayerNav from "./player-nav";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-full max-h-[40rem] grid grid-cols-2 md:grid-cols-6 grid-rows-5 gap-2">
      <WinrateTiles id={params.id} />
      <TotalsTiles id={params.id} />
      <HeroList id={params.id} />
      <PatchOverviewChart id={params.id} />
      {/* <RecentList id={params.id} /> */}
    </div>
  );
}
