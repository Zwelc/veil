import Spinner from "../../spinner";
import { useRecentMatches } from "../../../util/swr";

import DataTable from "../../DataTable";
import { createRecentRow } from "../../../lib/rows";

function RecentMatches({ id }) {
  const { matches, isLoading } = useRecentMatches(id);

  if (isLoading) return <Spinner />;

  const columns = [
    {
      id: "match",
      label: "Match",
      property: "match",
    },
    {
      id: "hero",
      label: "Hero",
      property: "hero",
    },
    {
      id: "result",
      label: "Result",
      property: "result",
    },
    {
      id: "kda",
      label: "KDA",
      property: "kda",
    },
    {
      id: "type",
      label: "Type",
      property: "type",
    },
    {
      id: "duration",
      label: "Duration",
      property: "duration",
    },
  ];
  const rows = matches.map((match) => createRecentRow(match));
  return <DataTable rows={rows} columns={columns} />;
}

export default RecentMatches;
