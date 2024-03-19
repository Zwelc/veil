"use client";

import { countries } from "dotaconstants";
import { usePathname } from "next/navigation";
import Link from "next/link";

import usePlayer from "@/hooks/usePlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PlayerProfile({ id }: { id: string }) {
  const pathname = usePathname();
  const menus = [
    { path: `/players/${id}`, title: "Overview" },
    { path: `/players/${id}/matches`, title: "Match History" },
    { path: `/players/${id}/heroes`, title: "Heroes" },
    { path: `/players/${id}/totals`, title: "Totals" },
  ];
  const { player, isLoading } = usePlayer(id);

  return (
    <Card className="row-span-4 md:row-span-6 col-span-2 md:col-span-2">
      <div className=" flex flex-col  space-y-2 mx-2">
        <CardHeader className="flex items-center  space-x-6 ">
          <div className=" w-24 h-24 rounded-full">
            {isLoading ? (
              <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full mb-2.5"></div>
            ) : (
              <Avatar className="w-20 h-20 ">
                <AvatarImage src={player.profile.avatarfull} />
                <AvatarFallback>{player.profile.personaname}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <>
                <div className="animate-pulse h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
                <div className="animate-pulse h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
              </>
            ) : (
              <>
                <CardTitle className="md:hidden">
                  {player.profile.personaname}
                </CardTitle>
                <div className="hidden md:block text-2xl font-bold">
                  {player.profile.personaname}
                </div>

                <p>
                  {player.profile.loccountrycode
                    ? countries[player.profile.loccountrycode].name.common
                    : "Undisclosed"}
                </p>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex ">
          <ul className="p-6 space-x-4 mx-2">
            {menus.map((menu) => (
              <Link href={menu.path} passHref key={menu.title}>
                <li className=" group  cursor-pointer">
                  <span
                    className={` font-medium  ${
                      pathname == menu.path ? "text-accent-500" : ""
                    }`}
                  >
                    {menu.title}
                  </span>
                  <div className="h-0.5 bg-accent-400 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
                </li>
              </Link>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
}
