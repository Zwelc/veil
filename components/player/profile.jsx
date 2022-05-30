import { Avatar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import usePlayer from "../../hooks/usePlayer";
import Spinner from "../spinner";
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
function Profile({ id }) {
  const { player, isLoading } = usePlayer(id);

  if (isLoading) return <Spinner />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={player.profile.personaname}
        src={player.profile.avatarfull}
        sx={{ width: 255, height: 255 }}
      />
      <Typography component="div" variant="h3">
        {player.profile.personaname}
      </Typography>
    </Box>
  );
}

export default Profile;
