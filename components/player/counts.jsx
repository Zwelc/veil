import { Avatar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useCounts } from "../../hooks/usePlayer";
import Spinner from "../spinner";

export default function ProfileCounts({ id }) {
  const { data: counts, isLoading } = useCounts(id);

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
