"use client";

import { usePlayerCounts } from "@/hooks/usePlayer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Donut from "@/components/charts/donut";
import DonutComponent from "@/components/charts/donut";
import StackedBarComponent from "@/components/charts/stacked-bar";
import { useEffect, useState } from "react";
import { ICounts } from "@/models/counts";
import { Button } from "../ui/button";

export default function OverviewChart({ id }: { id: string }) {
  const { data, isLoading } = usePlayerCounts(id);
  const [overview, setOverview] = useState("Patch");
  const [list, setList] = useState([] as any[]);
  const skeleton = new Array(1).fill(null);

  useEffect(() => {
    if (data) {
      updateChart(overview);
    }
  }, [data]);

  const updateChart = (name: string) => {
    if (name === "Patch") {
      setOverview("Patch");
      setList(data!.patch.slice(-12));
    }
    if (name === "Game Mode") {
      setOverview("Game Mode");
      setList(data!.gameMode);
    }
    if (name === "Lobby") {
      setOverview("Lobby");
      setList(data!.lobbyType);
    }
  };
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
        <Card className="row-span-8 md:row-span-4 col-span-2 md:col-span-5  w-full h-full ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{overview} Overview</CardTitle>
            <div className="space-x-2">
              <Button
                variant={overview === "Patch" ? "outline" : "ghost"}
                onClick={() => updateChart("Patch")}
              >
                Patch
              </Button>
              <Button
                variant={overview === "Game Mode" ? "outline" : "ghost"}
                onClick={() => updateChart("Game Mode")}
              >
                Game Mode
              </Button>
              <Button
                variant={overview === "Lobby" ? "outline" : "ghost"}
                onClick={() => updateChart("Lobby")}
              >
                Lobby
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <StackedBarComponent data={list} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
