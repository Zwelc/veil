"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { numberValue, dateLabel, type Row } from "./config";
import { NoData } from "./no-data";

export function PeopleView({ rows, pros }: { rows: Row[]; pros: boolean }) {
  const [search, setSearch] = useState("");
  const people = rows.filter((person) => {
    const haystack = [
      person.personaname,
      person.name,
      person.team_name,
      person.team_tag,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(search.toLowerCase());
  });
  const shown = people.slice(0, 24);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle>
            {pros ? "Pro players from your matches" : "Frequent teammates"}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {pros
              ? `${rows.length} professional player${rows.length === 1 ? "" : "s"} found`
              : `${rows.length.toLocaleString()} players, sorted by games together`}
          </p>
        </div>
        <Input
          aria-label="Search players"
          placeholder="Search players or teams..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-background/70 sm:max-w-xs"
        />
      </CardHeader>
      <CardContent>
        {shown.length === 0 ? (
          <NoData message="No players match your search." />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((person, index) => (
              <PersonCard
                key={`${person.account_id}-${index}`}
                person={person}
                pros={pros}
                rank={index + 1}
              />
            ))}
          </div>
        )}
        {people.length > shown.length && (
          <p className="pt-4 text-center text-xs text-muted-foreground">
            Showing {shown.length} of {people.length.toLocaleString()} matches.
            Refine your search to find other players.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function PersonCard({
  person,
  pros,
  rank,
}: {
  person: Row;
  pros: boolean;
  rank: number;
}) {
  const games = numberValue(person.games);
  const wins = numberValue(person.win);
  const winRate = games ? (wins / games) * 100 : 0;
  const displayName = String(
    person.personaname || person.name || `Player ${person.account_id ?? ""}`,
  );
  const avatar = String(person.avatarfull || person.avatar || "");
  const target = Number(person.account_id);

  return (
    <Card
      size="sm"
      className="bg-background/65 shadow-none transition-colors hover:border-primary/25 hover:bg-background"
    >
      <CardContent className="flex items-center gap-3 py-3">
        {!pros && (
          <span className="w-7 shrink-0 text-center text-xs font-semibold text-muted-foreground tabular-nums">
            #{rank}
          </span>
        )}
        <Avatar className="size-11 rounded-xl">
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>
            {displayName.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-sm font-semibold">
              {!pros && Number.isSafeInteger(target) && target > 0 ? (
                <Link
                  className="hover:text-primary"
                  href={`/players/${target}`}
                >
                  {displayName}
                </Link>
              ) : (
                displayName
              )}
            </p>
            {pros && Boolean(person.team_tag) && (
              <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary">
                {String(person.team_tag)}
              </span>
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {pros
              ? String(
                  person.team_name ||
                    person.country_code ||
                    "Professional player",
                )
              : `${games.toLocaleString()} games together · ${dateLabel(person.last_played)}`}
          </p>
          {games > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              {wins.toLocaleString()} wins ·{" "}
              <span className="font-semibold text-foreground">
                {winRate.toFixed(1)}%
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
