import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Spinner from "../spinner";
import { useState } from "react";
import { usePlayerHeroes } from "../../util/swr";
import { TablePaginationActions } from "../../util/table";
import { useHeroes } from "../../hooks/usePlayer";
import DataTable from "../DataTable";
import { createHeroRow } from "../../lib/rows";

function Heroes({ id }) {
  const { heroes, isLoading } = usePlayerHeroes(id);

  if (isLoading) return <Spinner />;

  const columns = [
    {
      id: "hero",
      label: "Hero",
      property: "hero",
    },
    {
      id: "games",
      label: "Total Games",
      property: "games",
    },
    {
      id: "wins",
      label: "Wins",
      property: "wins",
    },
  ];
  const rows = heroes.map((hero) => createHeroRow(hero));

  return <DataTable columns={columns} rows={rows} />;
}

export default Heroes;
