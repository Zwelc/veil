"use client";
import { use } from "react";

import { AnimatePresence } from "framer-motion";
import HeroList from "@/components/lists/hero-list";
import OverviewChart from "@/components/charts/overview";
import CounterTiles from "@/components/tiles/counter-tiles";
import Grid from "@/components/tiles/grid";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  return (
    <AnimatePresence>
      <Grid className="grid w-full grid-cols-1 gap-4 md:grid-cols-6">
        <CounterTiles id={params.id} />
        <HeroList id={params.id} />
        <OverviewChart id={params.id} />
      </Grid>
    </AnimatePresence>
  );
}
