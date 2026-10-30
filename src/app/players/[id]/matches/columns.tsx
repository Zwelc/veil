"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";

export type Match = {
  match_id: number;
  image: string;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  gameMode: string;
  lobby: string;
  duration: string;
  result: string;
  start_time: number;
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Match" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 py-1 font-medium whitespace-nowrap">
          <Avatar className="size-10 rounded-lg">
            <AvatarImage src={row.original.image} />
            <AvatarFallback>{row.getValue("name")}</AvatarFallback>
          </Avatar>
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    id: "kda",
    accessorFn: (match) =>
      (match.kills + match.assists) / Math.max(match.deaths, 1),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KDA" />
    ),
    cell: ({ row }) => {
      const { kills, deaths, assists } = row.original;
      const ratio = (kills + assists) / Math.max(deaths, 1);
      return (
        <div className="min-w-24">
          <p className="font-semibold tabular-nums">
            {kills} / {deaths} / {assists}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ratio.toFixed(2)} ratio
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "start_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Played" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.start_time * 1000);
      return (
        <div className="min-w-28">
          <p className="font-medium">
            {date.toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {row.original.lobby}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "gameMode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.gameMode}
      </span>
    ),
  },
  {
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Result" />
    ),
    cell: ({ row }) => {
      const won = row.original.result === "Won";
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            won
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-500/10 text-rose-700 dark:text-rose-400"
          }`}
        >
          {won ? "Victory" : "Defeat"}
        </span>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{row.original.duration}</span>
    ),
  },
];
