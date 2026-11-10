"use client";

import { usePlayerCounts } from "@/hooks/usePlayer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StackedBarComponent from "@/components/charts/stacked-bar";
import { useState } from "react";
import Block from "../tiles/block";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewChart({ id }: { id: string }) {
  const { data, isLoading } = usePlayerCounts(id);
  const [overview, setOverview] = useState<"Patch" | "Game Mode" | "Lobby">(
    "Patch",
  );
  const list = data
    ? overview === "Patch"
      ? data.patch.slice(-12)
      : overview === "Game Mode"
        ? data.gameMode
        : data.lobbyType
    : [];
  return (
    <Block className="col-span-1 w-full md:col-span-4">
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Match breakdown</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Wins and losses by {overview.toLowerCase()}
            </p>
          </div>
          <div className=" space-x-2">
            <Select
              value={`${overview}`}
              onValueChange={(value) => {
                if (value) setOverview(value as typeof overview);
              }}
            >
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
          {isLoading && <Skeleton className="ml-2 h-[260px] w-full" />}
          {data && <StackedBarComponent data={list} />}
          <Link
            href={`/players/${id}/totals`}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            See all lifetime stats{" "}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </Block>
  );
}
