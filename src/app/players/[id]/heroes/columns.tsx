"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown, LuMoreHorizontal } from "react-icons/lu";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Hero = {
  id: number;
  games: number;
  image: string;
  name: string;
  wins: number;
};

export const columns: ColumnDef<Hero>[] = [
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
];
