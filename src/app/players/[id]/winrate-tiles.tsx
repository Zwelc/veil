"use client";

import { usePlayerWinrate } from "@/hooks/usePlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WinrateTiles({ id }: { id: string }) {
  const { data, isLoading } = usePlayerWinrate(id);
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.win + data.lose}</div>
              <p className="text-xs text-muted-foreground">
                {((data.win / (data.win + data.lose)) * 100).toFixed(2)}%
                Winrate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.win}</div>
              <p className="text-xs text-muted-foreground">Overall</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
