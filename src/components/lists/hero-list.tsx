"use client";
import { usePlayerHeroes } from "@/hooks/usePlayer";
import ListItem from "@/components/lists/list-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

export default function HeroList({ id }: { id: string }) {
  const [date, setDate] = useState<number>(0);
  const { data, isLoading } = usePlayerHeroes(id, date);
  const skeleton = new Array(11).fill(null);

  return (
    <Card className="row-span- col-span-2 md:row-span-4 md:col-span-2 w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Most Played Heroes</CardTitle>
        <div className="space-x-2">
          <Button
            variant={date === 0 ? "outline" : "ghost"}
            onClick={() => setDate(0)}
          >
            All time
          </Button>
          <Button
            variant={date === 90 ? "outline" : "ghost"}
            onClick={() => setDate(90)}
          >
            3m
          </Button>
          <Button
            variant={date === 180 ? "outline" : "ghost"}
            onClick={() => setDate(180)}
          >
            6m
          </Button>
          <Button
            variant={date === 360 ? "outline" : "ghost"}
            onClick={() => setDate(360)}
          >
            1y
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ul className="divide-y divide-gray-200 ">
          {isLoading &&
            skeleton.map((item, index) => (
              <li key={index} className=" w-full animate-pulse py-3 sm:py-4 ">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
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
  );
}
