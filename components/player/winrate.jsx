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
    <div className="block p-6 max-w-sm bg-neutral-700 rounded-lg border border-gray-200 shadow-md shadow-violet-400">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
        {((data.win / (data.win + data.lose)) * 100).toFixed(2)}%
      </h5>
      <p className="font-normal text-gray-300">Winrate Overall</p>
    </div>
  );
}
