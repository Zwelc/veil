"use client";

import SkeletonCard from "@/components/skeleton/card";
import Block from "@/components/tiles/block";
import Grid from "@/components/tiles/grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotals } from "@/hooks/usePlayer";
import { Capitalize } from "@/lib/format";
import { convertHMS } from "@/lib/time";
import { AnimatePresence, motion } from "framer-motion";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useTotals(params.id);
  const skeleton = new Array(20).fill(null);

  return (
    <AnimatePresence>
      <Grid className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {isLoading &&
          skeleton.map((item, index) =>
            skeleton.map((item, index) => <SkeletonCard key={index} />)
          )}
        {data &&
          data.slice(0, -9).map((entry: any) => (
            <Block key={entry.field}>
              <Card className="w-full h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average{" "}
                    {entry.field
                      .split("_")
                      .map((word: string) => Capitalize(word))
                      .join(" ")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {entry.field === "duration"
                      ? convertHMS(entry.sum / entry.n)
                      : (entry.sum / entry.n).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </Block>
          ))}
      </Grid>
    </AnimatePresence>
  );
}
