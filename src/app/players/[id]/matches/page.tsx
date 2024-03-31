"use client";

import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePlayerMatches } from "@/hooks/usePlayer";

import { columns } from "./columns";
import { AnimatePresence, motion } from "framer-motion";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = usePlayerMatches(params.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full h-full"
      >
        <Card className="h-full w-full max-h-[40rem]">
          <CardHeader>
            <CardTitle>Match History</CardTitle>
          </CardHeader>
          <CardContent className="">
            <DataTable columns={columns} data={data || []} />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
