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
import { Skeleton } from "@/components/ui/skeleton";
import { winRate } from "@/lib/dota";

const DATE_RANGES = [
  { label: "All Time", value: "0" },
  { label: "3 Months", value: "90" },
  { label: "6 Months", value: "180" },
  { label: "1 year", value: "365" },
];

export default function HeroList({ id }: { id: string }) {
  const [date, setDate] = useState<string>("0");
  const { data, isLoading } = usePlayerHeroes(id, Number(date));

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
              items={DATE_RANGES}
              value={date}
              onValueChange={(value) => value && setDate(value)}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DATE_RANGES.map((range) => (
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
              Array.from({ length: 6 }, (_, index) => (
                <li key={index} className="py-3 sm:py-4" aria-hidden="true">
                  <Skeleton className="h-[29px] w-full" />
                </li>
              ))}

            {data &&
              data
                .slice(0, 6)
                .map((hero) => (
                  <ListItem
                    key={hero.id}
                    image={hero.image}
                    name={hero.name}
                    result={`${hero.games.toLocaleString()} games`}
                    detail={`${winRate(hero.wins, hero.games).toFixed(1)}% win rate`}
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
