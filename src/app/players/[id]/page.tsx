"use client";

import { AnimatePresence, motion } from "framer-motion";
import HeroList from "@/components/lists/hero-list";
import OverviewChart from "@/components/charts/overview";
import CounterTiles from "@/components/tiles/counter-tiles";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full h-full"
      >
        <div className="w-full h-full max-h-[40rem] gap-2 grid  grid-cols-2 md:grid-cols-6">
          <CounterTiles id={params.id} />
          <HeroList id={params.id} />
          <OverviewChart id={params.id} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
