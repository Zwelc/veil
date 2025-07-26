"use client";;
import { use } from "react";

import { usePlayerHeroes } from "@/hooks/usePlayer";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { data, isLoading } = usePlayerHeroes(params.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full h-full"
      >
        <Card className="w-full h-full max-h-[40rem]">
          <CardHeader>
            <CardTitle>Most Played Heroes</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data || []} />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
