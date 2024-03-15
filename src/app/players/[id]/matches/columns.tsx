"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";

export type Match = {
  id: number;
  image: string;
  name: string;
  kda: number;
  duration: string;
  result: string;
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Match" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center px-2 py-0.5 font-medium whitespace-nowrap ">
          <Avatar>
            <AvatarImage src={row.original.image} />
            <AvatarFallback>{row.getValue("name")}</AvatarFallback>
          </Avatar>
          <span className="px-4"> {row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "kda",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KDA" />
    ),
  },
  {
    accessorKey: "lobby",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lobby" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },
  {
    accessorKey: "result",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Result" />
    ),
  },
];
