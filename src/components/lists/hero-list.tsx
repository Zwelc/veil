/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePlayerHeroes } from "@/hooks/usePlayer";
import ListItem from "@/components/lists/list-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Block from "../tiles/block";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroList({ id }: { id: string }) {
  const [date, setDate] = useState<string>("0");
  const { data, isLoading } = usePlayerHeroes(id, +date);
  const skeleton = new Array(6).fill(null);

  const dateRanges = [
    { label: "All Time", value: "0" },
    { label: "3 Months", value: "90" },
    { label: "6 Months", value: "180" },
    { label: "1 year", value: "365" },
  ];
  return (
    <Block className="col-span-1 w-full md:col-span-2">
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <CardTitle>Most played heroes</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Top picks and their win rate
            </p>
          </div>
          <div className="space-x-1 md:space-x-2">
            <Select
              items={dateRanges}
              value={date}
              key={date}
              onValueChange={(v) => setDate(v!)}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="divide-y divide-border/60">
            {isLoading &&
              skeleton.map((item, index) => (
                <li key={index} className=" w-full animate-pulse py-3 sm:py-4 ">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <div className="mb-2.5 h-6 w-6 animate-pulse rounded-full bg-muted"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-2.5 h-2 max-w-[48px] animate-pulse rounded-full bg-muted"></div>
                    </div>
                    <div className="inline-flex h-2 items-center bg-muted text-base font-semibold"></div>
                  </div>
                </li>
              ))}

            {data &&
              data
                .slice(0, 6)
                .map((hero: any) => (
                  <ListItem
                    key={hero.id}
                    image={hero.image}
                    name={hero.name}
                    result={`${hero.games.toLocaleString()} games`}
                    detail={`${hero.games ? ((hero.wins / hero.games) * 100).toFixed(1) : "0.0"}% win rate`}
                  />
                ))}
          </ul>
          {!isLoading && data && data.length > 0 && (
            <Link
              href={`/players/${id}/heroes`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Explore all heroes{" "}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          )}
        </CardContent>
      </Card>
    </Block>
  );
}
