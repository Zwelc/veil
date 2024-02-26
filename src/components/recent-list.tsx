"use client";

import { usePlayerMatches } from "@/hooks/usePlayer";
import ListItem from "./list-item";

export default function RecentList({ id }: { id: string }) {
  const { data, isLoading } = usePlayerMatches(id);
  const skeleton = new Array(5).fill(null);

  return (
    <div className="block tile  p-4  col-span-2 row-span-2 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none ">Recent Matches</h5>
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
            .slice(0, 5)
            .map((match: any) => (
              <ListItem
                key={match.match_id}
                image={match.image}
                name={match.name}
                result={match.result}
              />
            ))}
      </ul>
    </div>
  );
}
