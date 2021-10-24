import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { convertHMS } from "../util/time";

function Match({ heroes, match }) {
  const type = match.lobby_type.toString().match(/[5-7]/)
    ? "Ranked"
    : "Unranked";
  const hero = heroes[match.hero_id];
  const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
  return (
    <TableRow
      key={match.match_id}
      sx={{
        bgColor: "primary",
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell component="th" scope="row">
        <img src={heroImg} alt={hero.name} height={29} width={59} />
      </TableCell>
      <TableCell>
        {match.player_slot <= 127 && match.radiant_win ? "Won" : "Lost"}
      </TableCell>
      <TableCell>
        {match.kills}/{match.deaths}/{match.assists}
      </TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{convertHMS(match.duration)}</TableCell>
    </TableRow>
  );
}
export default Match;
