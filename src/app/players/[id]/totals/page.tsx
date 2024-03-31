"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTotals } from "@/hooks/usePlayer";
import { convertHMS } from "@/lib/time";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useTotals(params.id);
  const skeleton = new Array(12).fill(null);

  const Capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <Card className=" w-full h-full max-h-[40rem]">
      <CardHeader>
        <CardTitle>Totals</CardTitle>
      </CardHeader>

      <CardContent className="relative overflow-x-auto h-full grid grid-cols-2 md:grid-cols-4 gap-1">
        {isLoading &&
          skeleton.map((item, index) => (
            <Card
              key={index}
              className="tile animate-pulse flex flex-col items-center justify-center"
            >
              <CardContent>
                <div className="animate-pulse h-2 bg-gray-200 rounded-full  max-w-[48px] mb-2.5"></div>
                <div className="animate-pulse h-2 bg-gray-200 max-w-[16px]"></div>
              </CardContent>
            </Card>
          ))}
        {data &&
          data.slice(0, -9).map((entry: any) => (
            <Card key={entry.field}>
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
          ))}
      </CardContent>
    </Card>
  );
}
