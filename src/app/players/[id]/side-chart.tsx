"use client";

import { usePlayerSideCounts } from "@/hooks/usePlayer";

import { Card } from "@/components/ui/card";
import Donut from "@/components/charts/donut";
import DonutComponent from "@/components/charts/donut";

export default function SidesChart({ id }: { id: string }) {
  const { data, isLoading } = usePlayerSideCounts(id);
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
        <Card className="row-span-1 col-span-1 w-full h-full">
          <DonutComponent data={data} />
        </Card>
      )}
    </>
  );
}
