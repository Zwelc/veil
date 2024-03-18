"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

export default function PlayerCard({ player }: { player: any }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="w-full flex items-center justify-center">
        <Avatar className="h-32 w-32  flex items-center justify-center">
          <AvatarImage src={player.avatarfull} className="h-32 w-32" />
          <AvatarFallback>{player.personaname}</AvatarFallback>
        </Avatar>
        <CardTitle>{player.personaname}</CardTitle>
        <CardDescription>
          Last Seen:{" "}
          {player.last_match_time
            ? new Date(player.last_match_time).toLocaleDateString("en-ZA", {
                // weekday: "long",
                year: "numeric",
                month: "long",
                // day: "numeric",
              })
            : "Undisclosed"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-end space-y-0 pb-2">
        <Button onClick={handleView}>See More</Button>
      </CardContent>
    </Card>
  );
}
