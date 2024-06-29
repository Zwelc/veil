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
import { motion } from "framer-motion";
import Block from "./tiles/block";

export default function PlayerCard({ player }: { player: any }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  return (
    <Block>
      <Card className="w-full h-full">
        <CardHeader className="w-full flex items-center justify-center">
          <Avatar className="h-32 w-32  flex items-center justify-center">
            <AvatarImage src={player.avatarfull} className="h-32 w-32" />
            <AvatarFallback>{player.personaname}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl">{player.personaname}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between space-x-2 space-y-0 pb-2">
          {player.last_match_time
            ? new Date(player.last_match_time).toLocaleDateString("en-ZA", {
                year: "numeric",
                month: "long",
              })
            : "Undisclosed"}
          <Button onClick={handleView}>See More</Button>
        </CardContent>
      </Card>
    </Block>
  );
}
