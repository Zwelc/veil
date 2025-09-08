/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Block from "./tiles/block";

export default function PlayerCard({ player }: { player: any }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  return (
    <Block>
      <Card className="w-full h-full p-4">
        <CardHeader className="w-full flex items-center justify-center">
          <Avatar className="h-32 w-32  flex items-center justify-center">
            <AvatarImage src={player.avatarfull} className="h-32 w-32" />
            <AvatarFallback>{player.personaname}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{player.personaname}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-between space-x-2 space-y-4 pb-2">
          <div className="text-gray-500">
            Last Seen:{" "}
            {player.last_match_time
              ? new Date(player.last_match_time).toLocaleDateString("en-ZA", {
                  year: "numeric",
                  month: "long",
                })
              : "Undisclosed"}
          </div>
          <Button onClick={handleView} className="w-full">
            See More
          </Button>
        </CardContent>
      </Card>
    </Block>
  );
}
