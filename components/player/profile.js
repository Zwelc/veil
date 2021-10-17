import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Paper } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ranks = [
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];
function getRank(tier) {
  const text = tier.toString();
  const index = text.slice(0, 1);
  const rank = ranks[index - 1];

  return rank + " " + text.slice(1);
}
export function ProfileWinrate({ wl }) {
  return (
    <Paper>
      <div>Wins: {wl.win}</div>
      <div>Losses: {wl.lose}</div>
      <hr />
      <div>Winrate: {((wl.win / (wl.win + wl.lose)) * 100).toFixed(2)}% </div>
    </Paper>
  );
}

export function ProfileCounts({ counts }) {
  return (
    <Paper>
      <div>
        Dire:{" "}
        {(
          (counts.is_radiant[0].win / counts.is_radiant[0].games) *
          100
        ).toFixed(2)}
        %
      </div>
      <div>
        Radiant:{" "}
        {(
          (counts.is_radiant[1].win / counts.is_radiant[1].games) *
          100
        ).toFixed(2)}
        %
      </div>
    </Paper>
  );
}
function Profile(props) {
  const player = props.player;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="184"
        image={player.profile.avatarfull}
        alt={player.profile.personaname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {player.profile.personaname}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
