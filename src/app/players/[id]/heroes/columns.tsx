"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { formatDate, winRate } from "@/lib/dota";
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

type CountKey = "wins" | "winsWith" | "winsAgainst" | "games" | "gamesWith" | "gamesAgainst";

/** Win-rate column: sorts by rate (accessor) and renders the same value (no recompute). */
function rateColumn(
  id: string,
  title: string,
  wins: CountKey,
  games: CountKey,
): ColumnDef<IHero> {
  return {
    id,
    accessorFn: (hero) => winRate(hero[wins], hero[games]),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={title} />
    ),
    cell: ({ row, getValue }) => (
      <RateCell
        rate={getValue<number>()}
        wins={row.original[wins]}
        games={row.original[games]}
      />
    ),
  };
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
  rateColumn("winRate", "Win rate", "wins", "games"),
  rateColumn("withRate", "With this hero", "winsWith", "gamesWith"),
  rateColumn("againstRate", "Against this hero", "winsAgainst", "gamesAgainst"),
  {
    accessorKey: "lastPlayed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last played" />
    ),
    cell: ({ row }) =>
      row.original.lastPlayed > 0 ? (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {formatDate(row.original.lastPlayed)}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
