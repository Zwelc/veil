"use client";

import { useTotals } from "@/hooks/usePlayer";
import { convertHMS } from "@/utils/time";
import { Card } from "./ui/card";

export default function TotalsTiles({ id }: { id: string }) {
  const { data, isLoading } = useTotals(id);
  const skeleton = new Array(2).fill(null);

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
      {data &&
        data
          ?.filter(
            (entry: any) => entry.field == "kills" || entry.field == "deaths"
          )
          .map((entry: any) => (
            <Card
              key={entry.field}
              className="tile flex flex-col items-center justify-center"
            >
              <dt className="mb-2 text-3xl font-extrabold">
                {entry.field === "duration"
                  ? convertHMS(entry.sum)
                  : (entry.sum / entry.n).toFixed(2)}
              </dt>
              <dd className="">Average {entry.field}</dd>
            </Card>
          ))}
    </>
  );
}
