import { Avatar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <div>{wl.win} Wins</div>
      <div>{wl.lose} Losses</div>
      <div>{((wl.win / (wl.win + wl.lose)) * 100).toFixed(2)}% Overall</div>
    </Box>
  );
}

export function ProfileCounts({ counts }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
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
    </Box>
  );
}
function Profile({ player }) {
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
