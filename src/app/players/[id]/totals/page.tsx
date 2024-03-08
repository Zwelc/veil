"use client";
import TablePagination from "@/components/Pagination";
import { usePlayerHeroes, useTotals } from "@/hooks/usePlayer";
import { convertHMS } from "@/utils/time";
import Image from "next/image";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useTotals(params.id);
  const skeleton = new Array(12).fill(null);

  const Capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <>
      <div className="block tile p-4 row-span-4 col-span-3 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none ">Totals</h5>
        </div>
        <div className="relative overflow-x-auto h-[44rem] grid grid-cols-4 py-4 gap-4">
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
            data.slice(0, -1).map((entry: any) => (
              <div
                key={entry.field}
                className="tile flex flex-col items-center justify-center"
              >
                <dt className="mb-2 text-3xl font-extrabold">
                  {entry.field === "duration"
                    ? convertHMS(entry.sum / entry.n)
                    : (entry.sum / entry.n).toFixed(2)}
                </dt>
                <dd className="">
                  Average{" "}
                  {entry.field
                    .split("_")
                    .map((word: string) => Capitalize(word))
                    .join(" ")}
                </dd>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
