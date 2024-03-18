import HeroList from "./hero-list";

import RecentList from "@/components/recent-list";
import TotalsTiles from "./totals-tiles";
import WinrateTiles from "./winrate-tiles";
import SidesChart from "./side-chart";
import PatchOverviewChart from "./patch-overview";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <WinrateTiles id={params.id} />
      {/* <SidesChart id={params.id} /> */}
      <TotalsTiles id={params.id} />
      <HeroList id={params.id} />
      <PatchOverviewChart id={params.id} />
      <RecentList id={params.id} />
    </>
  );
}
