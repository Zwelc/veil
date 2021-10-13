import MatchRow from "./matchRow";
import styles from "./recentMatches.module.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { convertHMS } from "../../../util/time";
import Image from "next/image";
function RecentMatches(props) {
  const recent = props.recent;
  const heroes = props.heroes;
  const mode = props.mode;
  const lobby = props.lobby;

  return (
		<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {recent.map((match) => {
						const lobbyType = lobby[match.lobby_type];
						const hero = heroes[match.hero_id];
						const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
						return (
            <TableRow
              key={match.match_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
								<Image src={heroImg} height={29} width={59} />
              </TableCell>
              <TableCell >{match.player_slot <= 127 && match.radiant_win ? "Won" : "Lost"}</TableCell>
              <TableCell >{match.kills}/{match.deaths}/{match.assists}</TableCell>
              <TableCell >{lobbyType.name
								.slice(10)
								.split("_")
								.join(" ")
								.match(/ranked/)
								? "Ranked"
								: "Unranked"}
								</TableCell>
              <TableCell>{convertHMS(match.duration)}</TableCell>
            </TableRow>
						)
					})}
        </TableBody>
      </Table>
    </TableContainer>
    // <table className={styles.table}>
    //   <tbody>
    //     {recent.map((match) => (
    //       <MatchRow
    //         key={match.match_id}
    //         matches={match}
    //         heroes={heroes}
    //         mode={mode}
    //         lobby={lobby}
    //       />
    //     ))}
    //   </tbody>
    // </table>
  );
}

export default RecentMatches;
