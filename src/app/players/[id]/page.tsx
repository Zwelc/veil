"use client";

import { AnimatePresence, motion } from "framer-motion";
import HeroList from "@/components/lists/hero-list";
import OverviewChart from "@/components/charts/overview";
import CounterTiles from "@/components/tiles/counter-tiles";
import Grid from "@/components/tiles/grid";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <AnimatePresence>
      <Grid className="w-full h-full max-h-[40rem] gap-2 grid  grid-cols-2 md:grid-cols-6">
        <CounterTiles id={params.id} />
        <HeroList id={params.id} />
        <OverviewChart id={params.id} />
      </Grid>
    </AnimatePresence>
  );
}
