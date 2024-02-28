import HeroList from "@/components/hero-list";

import RecentList from "@/components/recent-list";
import TotalsTiles from "@/components/totals-tiles";
import WinrateTiles from "@/components/winrate-tiles";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <WinrateTiles id={params.id} />

      <HeroList id={params.id} />
      <TotalsTiles id={params.id} />
      <RecentList id={params.id} />
    </>
  );
}
