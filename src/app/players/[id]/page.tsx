"use client";

import HeroList from "./hero-list";

import TotalsTiles from "./totals-tiles";
import WinrateTiles from "./winrate-tiles";

import PatchOverviewChart from "./patch-overview";
import { AnimatePresence, motion } from "framer-motion";

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
        <div className="w-full h-full max-h-[40rem] grid grid-cols-2 md:grid-cols-6 grid-rows-5 gap-2">
          <WinrateTiles id={params.id} />
          <TotalsTiles id={params.id} />
          <HeroList id={params.id} />
          <PatchOverviewChart id={params.id} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
