/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Block from "./tiles/block";
import { cn } from "@/lib/utils";

export default function PlayerCard({ player }: { player: any }) {
  return (
    <Block>
      <Card className="group/player-card relative h-full w-full border-border/70 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
        <CardHeader className="relative w-full items-center justify-center overflow-hidden pt-6 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"
          />
          <Avatar className="relative z-10 h-24 w-24 shadow-lg ring-4 ring-background group-hover/player-card:ring-primary/15">
            <AvatarImage src={player.avatarfull} className="h-24 w-24" />
            <AvatarFallback>{player.personaname}</AvatarFallback>
          </Avatar>
          <CardTitle className="line-clamp-2 min-h-12 text-xl">
            {player.personaname}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col items-center gap-4 pb-4">
          <div className="flex min-h-5 items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-4" />
            <span>
              {player.last_match_time
                ? `Last active ${new Date(
                    player.last_match_time,
                  ).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  })}`
                : "Activity undisclosed"}
            </span>
          </div>
          <Link
            href={`/players/${player.account_id}`}
            className={cn(buttonVariants(), "w-full justify-between px-4")}
          >
            <span>View player</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover/player-card:translate-x-0.5 group-hover/player-card:-translate-y-0.5"
            />
          </Link>
        </CardContent>
      </Card>
    </Block>
  );
}
