import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Hero({ hero, heroData }, onArchiveTask, onPinTask) {
  const selectedHero = heroData[hero.hero_id];
  const heroImg = `https://steamcdn-a.akamaihd.net/${selectedHero.img}`;
  const winrate = ((hero.win / hero.games) * 100).toFixed(2) + "%";
  return (
    <TableRow
      key={hero.hero_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <img
          src={heroImg}
          height={29}
          width={59}
          alt={selectedHero.localized_name}
        />
      </TableCell>
      <TableCell>{hero.games}</TableCell>
      <TableCell>{hero.win}</TableCell>
      <TableCell>{winrate}</TableCell>
    </TableRow>
  );
}

export default Hero;
