import { Avatar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { usePlayerWinrate } from "../../hooks/usePlayer";
import Spinner from "../spinner";

export default function ProfileWinrate({ id }) {
  const { data, isLoading } = usePlayerWinrate(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
      <div>{data.win} Wins</div>
      <div>{data.lose} Losses</div>
      <div>
        {((data.win / (data.win + data.lose)) * 100).toFixed(2)}% Overall
      </div>
    </Box>
  );
}
