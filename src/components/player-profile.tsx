"use client";

import Image from "next/image";
import { countries } from "dotaconstants";
import { usePathname } from "next/navigation";
import Link from "next/link";

import usePlayer from "@/hooks/usePlayer";

export default function PlayerProfile({ id }: { id: string }) {
  const pathname = usePathname();
  const menus = [
    { path: `/players/${id}`, title: "Overview" },
    { path: `/players/${id}/matches`, title: "Match History" },
    { path: `/players/${id}/heroes`, title: "Heroes" },
  ];
  const { player, isLoading } = usePlayer(id);

  return (
    <div className="tile row-span-4 flex flex-col p-6 space-y-2 mx-2">
      <section className="flex items-center p-6 space-x-6 ">
        <div className=" w-24 h-24 rounded-full">
          {isLoading ? (
            <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full mb-2.5"></div>
          ) : (
            <Image
              className="w-24 h-24  rounded-full"
              src={player.profile.avatarfull}
              alt={player.profile.personaname}
              width={100}
              height={100}
            />
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
              <div className="text-2xl font-bold">
                {player.profile.personaname}
              </div>

              <p>{countries[player.profile.loccountrycode].name.common}</p>
            </>
          )}
        </div>
      </section>
      <section>
        <ul className="p-6 space-y-4 mx-2">
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
      </section>
    </div>
  );
}
