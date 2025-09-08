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
} from "@/components/ui/select";

export default function HeroList({ id }: { id: string }) {
  const [date, setDate] = useState<number>(0);
  const { data, isLoading } = usePlayerHeroes(id, date);
  const skeleton = new Array(6).fill(null);

  return (
    <Block className="row-span-8 col-span-2 md:row-span-4 md:col-span-2 w-full h-full">
      <Card className="w-full h-full ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-nowrap">
          <CardTitle>Heroes</CardTitle>
          <div className=" space-x-1 md:space-x-2 ">
            <Select value={`${date}`} onValueChange={(v) => setDate(+v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">All Time</SelectItem>
                <SelectItem value="90">3 Months</SelectItem>
                <SelectItem value="180">6 Months</SelectItem>
                <SelectItem value="360">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <ul className="divide-y divide-gray-200 ">
            {isLoading &&
              skeleton.map((item, index) => (
                <li key={index} className=" w-full animate-pulse py-3 sm:py-4 ">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <div className="animate-pulse w-6 h-6 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="animate-pulse h-2 bg-gray-200 rounded-full  max-w-[48px] mb-2.5"></div>
                    </div>
                    <div className="h-2 bg-gray-200 inline-flex items-center text-base font-semibold "></div>
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
                    result={hero.games}
                  />
                ))}
          </ul>
        </CardContent>
      </Card>
    </Block>
  );
}
