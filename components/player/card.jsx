import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function PlayerCard({ player, path, action }) {
  const router = useRouter();

  const handleSave = () => {
    let players = JSON.parse(localStorage.getItem("id"));
    if (players) {
      if (
        !players.players.find(
          (record) => record.account_id == player.account_id
        )
      ) {
        players.players.push(player);
      }
    } else {
      players = { players: [] };
      players.players.push(player);
    }
    localStorage.setItem("id", JSON.stringify({ players: players.players }));
  };

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  const handleRemove = () => {
    let savedPlayers = JSON.parse(localStorage.getItem("id"));
    const rest = savedPlayers.players.filter(
      (record) => record.account_id != player.account_id
    );

    localStorage.setItem("id", JSON.stringify({ players: rest }));
    action(rest);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="210"
        image={player.avatarfull}
        alt={player.personaname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {player.personaname}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleView} color="inherit">
          View
        </Button>
        {path === "/players" ? (
          <Button size="small" onClick={handleSave} color="inherit">
            Save
          </Button>
        ) : (
          <Button size="small" onClick={handleRemove} color="inherit">
            Remove
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
