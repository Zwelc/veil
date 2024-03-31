"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usePlayer from "@/hooks/usePlayer";
import { countries } from "dotaconstants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlayerNav({ id }: { id: string }) {
  const { player, isLoading } = usePlayer(id);
  const pathname = usePathname();
  const menus = [
    { path: `/players/${id}`, title: "Overview" },
    { path: `/players/${id}/matches`, title: "Match History" },
    { path: `/players/${id}/heroes`, title: "Heroes" },
    { path: `/players/${id}/totals`, title: "Totals" },
  ];

  return (
    <div className="w-full space-y-2">
      <div className="space-x-4  flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          {/* <div className=" w-24 h-24 rounded-full"> */}
          {isLoading ? (
            <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full mb-2.5"></div>
          ) : (
            <Avatar className="w-20 h-20 ">
              <AvatarImage src={player.profile.avatarfull} />
              <AvatarFallback>{player.profile.personaname}</AvatarFallback>
            </Avatar>
          )}
          {/* </div> */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight">
              {player && player.profile.personaname}
            </h2>
            <p>
              {player && player.profile.loccountrycode
                ? countries[player.profile.loccountrycode].name.common
                : "Undisclosed"}
            </p>
          </div>
        </div>
      </div>
      <div>
        <ul className="flex space-x-4 mx-2">
          {menus.map((menu) => (
            <Link href={menu.path} passHref key={menu.title}>
              <li className=" group  cursor-pointer">
                <span
                  className={` font-medium  ${
                    pathname == menu.path ? "text-primary" : ""
                  }`}
                >
                  {menu.title}
                </span>
                <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
