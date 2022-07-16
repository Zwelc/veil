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
    <div className="block p-6 max-w-sm bg-neutral-700 rounded-lg border border-gray-200 shadow-md shadow-violet-400">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
        Dire:{" "}
        {(
          (counts.is_radiant[0].win / counts.is_radiant[0].games) *
          100
        ).toFixed(2)}
        %
      </h5>
      <p className="font-normal text-gray-300">Winrate Overall</p>
    </div>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     p: 2,
    //   }}
    // >
    //   <div>
    //     Dire:{" "}
    //     {(
    //       (counts.is_radiant[0].win / counts.is_radiant[0].games) *
    //       100
    //     ).toFixed(2)}
    //     %
    //   </div>
    //   <div>
    //     Radiant:{" "}
    //     {(
    //       (counts.is_radiant[1].win / counts.is_radiant[1].games) *
    //       100
    //     ).toFixed(2)}
    //     %
    //   </div>
    // </Box>
  );
}
