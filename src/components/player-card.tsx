"use client";

import MotionLink from "./motion/motion-link";
import { m, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Block from "./tiles/block";
import { countryName } from "@/lib/dota";
import { spring } from "@/lib/motion";
import type { IPlayerSummary } from "@/models/player";

function lastActive(iso: string | null) {
  if (!iso) return "Activity undisclosed";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Activity undisclosed";
  return `Last active ${date.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  })}`;
}

// The link owns the gestures; its arrow inherits "hover". The Block keeps the entrance.
const lift: Variants = {
  hover: { y: -3, transition: spring },
  tap: { scale: 0.98, transition: spring },
};
const nudge: Variants = {
  hover: { x: 2, y: -2, transition: spring },
};

const badge =
  "rounded-md border border-border/70 bg-background/70 px-1.5 py-0.5 text-[0.7rem] font-semibold leading-none tracking-wide text-muted-foreground";

/** Compact, fully clickable player entry for pro listings and search results. */
export default function PlayerCard({ player }: { player: IPlayerSummary }) {
  const { team_tag: team, country_code: country } = player;

  return (
    <Block>
      <MotionLink
        variants={lift}
        whileHover="hover"
        whileTap="tap"
        href={`/players/${player.account_id}`}
        aria-label={`View ${player.personaname}`}
        className="group/player-card flex h-full items-center gap-3 rounded-xl border border-border/70 bg-card p-3 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Avatar className="size-14 shrink-0 shadow-sm ring-2 ring-background group-hover/player-card:ring-primary/20">
          <AvatarImage src={player.avatarfull ?? undefined} alt="" />
          <AvatarFallback>{player.personaname.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{player.personaname}</p>
          {(team || country) && (
            <div className="mt-1 flex items-center gap-1.5">
              {team && (
                <span className={badge} title="Team">
                  {team}
                </span>
              )}
              {country && (
                <span className={badge} title={countryName(country)}>
                  {country}
                </span>
              )}
            </div>
          )}
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {lastActive(player.last_match_time)}
          </p>
        </div>
        <m.span variants={nudge} className="inline-flex shrink-0">
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-muted-foreground transition-colors group-hover/player-card:text-primary"
          />
        </m.span>
      </MotionLink>
    </Block>
  );
}
