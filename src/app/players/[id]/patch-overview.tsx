"use client";

import { usePlayerPatchCounts, usePlayerSideCounts } from "@/hooks/usePlayer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Donut from "@/components/charts/donut";
import DonutComponent from "@/components/charts/donut";
import StackedBarComponent from "@/components/charts/stacked-bar";

export default function PatchOverviewChart({ id }: { id: string }) {
  const { data, isLoading } = usePlayerPatchCounts(id);
  const skeleton = new Array(1).fill(null);

  return (
    <>
      {isLoading &&
        skeleton.map((item, index) => (
          <div
            key={index}
            className="tile animate-pulse flex flex-col items-center justify-center"
          >
            <div className="animate-pulse h-2 bg-gray-200 rounded-full  max-w-[48px] mb-2.5"></div>
            <div className="animate-pulse h-2 bg-gray-200 max-w-[16px]"></div>
          </div>
        ))}
      {data && (
        <Card className="row-span-2 md:row-span-3 col-span-2 md:col-span-4  w-full h-full h-">
          <CardHeader>
            <CardTitle>Patch Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <StackedBarComponent data={data.slice(-12)} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
