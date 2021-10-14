import styles from "../../styles/Player.module.scss";
import { Avatar, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
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
export function ProfileWinrate({wl}) {
	return (
		<Paper>
		  <div>Wins: {wl.win}</div>
      <div>Losses: {wl.lose}</div>
      <hr />
      <div>Winrate: {((wl.win / (wl.win + wl.lose)) * 100).toFixed(2)}% </div>
		</Paper>
	)
}

export function ProfileCounts({counts}) {
	return (
		<Paper>
		<div>
        Dire:{" "}
          {((counts.is_radiant[0].win / counts.is_radiant[0].games) * 100).toFixed(2)}%
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
	)
}
function Profile(props) {
  const player = props.player;
  const counts = props.counts;
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
  // return (
  //   <div className={styles.container}>
	// 	<Paper elevation={2} sx={{display: 'flex'}}>
	// 	<Box sx={{display: 'flex', flexDirection: 'row'}}>
	// 		<Avatar 
	// 			src={player.profile.avatarfull} alt={player.profile.personaname} />
	// 		<Typography variant="h6" component="h6">
	// 		{player.profile.personaname}
	// 		</Typography>
	// 		</Box>
	// 	</Paper>
  //     <div className={styles.header}>
  //       <img src={player.profile.avatarfull} />
  //       <div className={styles.name}>{player.profile.personaname}</div>
  //     </div>
  //     <hr />
  //     <div className={styles.right}>Rank: {getRank(player.rank_tier)}</div>
  //     <div>Wins: {wl.win}</div>
  //     <div>Losses: {wl.lose}</div>
  //     <hr />
  //     <div>Winrate: {((wl.win / (wl.win + wl.lose)) * 100).toFixed(2)}% </div>
  //     <div>
  //       Dire:{" "}
  //       {(
  //         (counts.is_radiant[0].win / counts.is_radiant[0].games) *
  //         100
  //       ).toFixed(2)}
  //       %
  //     </div>
  //     <div>
  //       Radiant:{" "}
  //       {(
  //         (counts.is_radiant[1].win / counts.is_radiant[1].games) *
  //         100
  //       ).toFixed(2)}
  //       %
  //     </div>
  //   </div>
  // );
}

export default Profile;
