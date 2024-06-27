"use client";

import Menu from "@/components/layout/menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usePlayer from "@/hooks/usePlayer";
import { countries } from "dotaconstants";

export default function PlayerNav({ id }: { id: string }) {
  const { data: player, isLoading } = usePlayer(id);

  return (
    <div className="w-full space-y-2 flex flex-col">
      <div className="space-x-4 flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full mb-2.5"></div>
          ) : (
            <Avatar className="w-20 h-20 ">
              <AvatarImage src={player.data.profile.avatarfull} />
              <AvatarFallback>{player.data.profile.personaname}</AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight">
              {player && player.data.profile.personaname}
            </h2>
            <p>
              {player && player.data.profile.loccountrycode
                ? countries[player.data.profile.loccountrycode].name.common
                : "Undisclosed"}
            </p>
          </div>
        </div>
      </div>
      <Menu id={id} />
      <hr />
    </div>
  );
}
