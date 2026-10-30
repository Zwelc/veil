"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { IHero } from "@/models/hero";
import Image from "next/image";

function RateCell({
  rate,
  wins,
  games,
}: {
  rate: number;
  wins: number;
  games: number;
}) {
  return (
    <div className="min-w-24 space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold tabular-nums">{rate.toFixed(1)}%</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {wins}/{games}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={`${rate.toFixed(1)} percent win rate`}
        aria-valuenow={Math.round(rate)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${Math.min(100, Math.max(0, rate))}%` }}
        />
      </div>
    </div>
  );
}

export const columns: ColumnDef<IHero>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hero" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 whitespace-nowrap font-medium">
          <Image
            src={row.original.image}
            alt=""
            width={64}
            height={36}
            className="h-9 w-16 rounded-md object-cover"
          />
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "games",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Games" />
    ),
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        {row.original.games.toLocaleString()}
      </span>
    ),
  },
  {
    id: "winRate",
    accessorFn: (hero) => (hero.games ? (hero.wins / hero.games) * 100 : 0),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Win rate" />
    ),
    cell: ({ row }) => (
      <RateCell
        rate={
          row.original.games
            ? (row.original.wins / row.original.games) * 100
            : 0
        }
        wins={row.original.wins}
        games={row.original.games}
      />
    ),
  },
  {
    id: "withRate",
    accessorFn: (hero) =>
      hero.gamesWith ? (hero.winsWith / hero.gamesWith) * 100 : 0,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="With this hero" />
    ),
    cell: ({ row }) => (
      <RateCell
        rate={
          row.original.gamesWith
            ? (row.original.winsWith / row.original.gamesWith) * 100
            : 0
        }
        wins={row.original.winsWith}
        games={row.original.gamesWith}
      />
    ),
  },
  {
    id: "againstRate",
    accessorFn: (hero) =>
      hero.gamesAgainst ? (hero.winsAgainst / hero.gamesAgainst) * 100 : 0,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Against this hero" />
    ),
    cell: ({ row }) => (
      <RateCell
        rate={
          row.original.gamesAgainst
            ? (row.original.winsAgainst / row.original.gamesAgainst) * 100
            : 0
        }
        wins={row.original.winsAgainst}
        games={row.original.gamesAgainst}
      />
    ),
  },
  {
    accessorKey: "lastPlayed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last played" />
    ),
    cell: ({ row }) =>
      row.original.lastPlayed > 0 ? (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {new Date(row.original.lastPlayed * 1000).toLocaleDateString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
