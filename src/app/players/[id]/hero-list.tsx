"use client";
import { usePlayerHeroes } from "@/hooks/usePlayer";
import ListItem from "@/components/list-item";
import { Card } from "@/components/ui/card";

export default function HeroList({ id }: { id: string }) {
  const { data, isLoading } = usePlayerHeroes(id);
  const skeleton = new Array(11).fill(null);

  return (
    <Card className="row-span- col-span-2 md:row-span-4 md:col-span-2 w-full h-full">
      <div className="block p-4  w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none ">
            Most Played Heroes
          </h5>
        </div>
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
      </div>
    </Card>
  );
}
