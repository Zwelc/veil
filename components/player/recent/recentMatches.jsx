import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Spinner from "../../spinner";
import { useState } from "react";
import { convertHMS } from "../../../util/time";
import { useRecentMatches } from "../../../util/swr";
import { TableHead } from "@mui/material";
import { TablePaginationActions } from "../../../util/table";
import { useHeroes, useLobbies } from "../../../hooks/usePlayer";

function RecentMatches({ id }) {
  const { matches, isLoading } = useRecentMatches(id);
  const { heroes, isLoading: heroesLoaded } = useHeroes();
  const { data: lobby, isLoading: lobbyLoaded } = useLobbies();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (isLoading || heroesLoaded || lobbyLoaded) return <Spinner />;

  return (
    <TableContainer component={Paper} elevation={6}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Hero</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>KDA</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? matches.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : matches
          ).map((match) => {
            const lobbyType = lobby[match.lobby_type];
            const hero = heroes[match.hero_id];
            const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
            return (
              <TableRow
                key={match.match_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Image src={heroImg} height={29} width={59} />
                </TableCell>
                <TableCell>
                  {match.player_slot <= 127 && match.radiant_win
                    ? "Won"
                    : "Lost"}
                </TableCell>
                <TableCell>
                  {match.kills}/{match.deaths}/{match.assists}
                </TableCell>
                <TableCell>
                  {lobbyType.name
                    .slice(10)
                    .split("_")
                    .join(" ")
                    .match(/ranked/)
                    ? "Ranked"
                    : "Unranked"}
                </TableCell>
                <TableCell>{convertHMS(match.duration)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={matches.length}
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

export default RecentMatches;
