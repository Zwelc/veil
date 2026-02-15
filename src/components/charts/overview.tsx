/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePlayerCounts } from "@/hooks/usePlayer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StackedBarComponent from "@/components/charts/stacked-bar";
import { useEffect, useState } from "react";
import Block from "../tiles/block";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function OverviewChart({ id }: { id: string }) {
  const { data, isLoading } = usePlayerCounts(id);
  const [overview, setOverview] = useState<"Patch" | "Game Mode" | "Lobby">(
    "Patch",
  );
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
    <Block className="row-span-8 md:row-span-4 col-span-2 md:col-span-4  w-full h-full">
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Overview</CardTitle>
          <div className=" space-x-2">
            <Select value={`${overview}`} onValueChange={(v) => updateChart(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Patch">Patch</SelectItem>
                <SelectItem value="Game Mode">Game Mode</SelectItem>
                <SelectItem value="Lobby">Lobby</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
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
          {data && <StackedBarComponent data={list} />}
        </CardContent>
      </Card>
    </Block>
  );
}
