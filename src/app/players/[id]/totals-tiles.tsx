"use client";

import { useTotals } from "@/hooks/usePlayer";
import { convertHMS } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalsTiles({ id }: { id: string }) {
  const { data, isLoading } = useTotals(id);
  const skeleton = new Array(2).fill(null);

  return (
    <div className="row-span-1 col-span-2">
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
        <div className="w-full h-full grid grid-cols-2 gap-2">
          {data
            ?.filter(
              (entry: any) => entry.field == "kills" || entry.field == "deaths"
            )
            .map((entry: any) => (
              <Card key={entry.field}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average {entry.field}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {entry.field === "duration"
                      ? convertHMS(entry.sum)
                      : (entry.sum / entry.n).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
