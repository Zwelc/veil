"use client";

import { usePlayerWinrate } from "@/hooks/usePlayer";
import { Card } from "./ui/card";

export default function WinrateTiles({ id }: { id: string }) {
  const { data, isLoading } = usePlayerWinrate(id);
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
      {data && (
        <>
          <Card className="tile flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">
              {data.win + data.lose}
            </dt>
            <dd className="">Total Matches</dd>
          </Card>
          <Card className="tile flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{data.win}</dt>
            <dd className="">Total Wins</dd>
          </Card>
        </>
      )}
    </>
  );
}
