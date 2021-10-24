import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function Player({ account_id, avatarfull, personaname }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="210"
          image={avatarfull}
          alt={personaname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {personaname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Player;
