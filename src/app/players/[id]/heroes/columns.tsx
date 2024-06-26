"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { IHero } from "@/models/hero";

export const columns: ColumnDef<IHero>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hero" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex space-x-4 items-center px-2 py-0.5 font-medium  whitespace-nowrap ">
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
    accessorKey: "games",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Games" />
    ),
  },
  {
    accessorKey: "wins",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wins" />
    ),
  },
  {
    accessorKey: "winsWith",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wins with" />
    ),
  },
  {
    accessorKey: "winsAgainst",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wins against" />
    ),
  },
];
