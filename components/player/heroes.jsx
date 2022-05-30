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

function Heroes({ id }) {
  const { heroes, isLoading } = usePlayerHeroes(id);
  const { heroes: heroData, isLoading: heroesLoaded } = useHeroes();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (isLoading || heroesLoaded) return <Spinner />;
  // if (isError) return <Error />
  return (
    <TableContainer component={Paper} elevation={6}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Hero</TableCell>
            <TableCell>Total Games</TableCell>
            <TableCell>Wins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? heroes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : heroes
          ).map((hero) => {
            const selectedHero = heroData[hero.hero_id];
            const heroImg = `https://steamcdn-a.akamaihd.net/${selectedHero.img}`;
            return (
              <TableRow
                key={hero.hero_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Image src={heroImg} height={29} width={59} alt={hero} />
                </TableCell>
                <TableCell>{hero.games}</TableCell>
                <TableCell>{hero.win}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={heroes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default Heroes;
