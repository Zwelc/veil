"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function PlayerCard({ player }: { player: any }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center space-x-4 space-y-0 pb-2">
        <Avatar>
          <AvatarImage src={player.avatarfull} />
          <AvatarFallback>{player.personaname}</AvatarFallback>
        </Avatar>
        <CardTitle>{player.personaname}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm text-muted-foreground">
          Last Seen:{" "}
          {player.last_match_time
            ? new Date(player.last_match_time).toLocaleDateString("en-ZA", {
                // weekday: "long",
                year: "numeric",
                month: "long",
                // day: "numeric",
              })
            : "Undisclosed"}
        </p>
        <Button onClick={handleView}>See More</Button>
      </CardContent>
      {/* <CardFooter className="flex flex-row items-center justify-end space-y-0 pb-2">
        <p className="text-sm text-muted-foreground">
          {player.last_match_time
            ? new Date(player.last_match_time).toLocaleDateString("en-ZA", {
                // weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Undisclosed"}
        </p>
        <Button onClick={handleView}>See More</Button>
      </CardFooter> */}
    </Card>
  );
}
