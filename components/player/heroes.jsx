import Spinner from "../spinner";
import { usePlayerHeroes } from "../../util/swr";
import DataTable from "../DataTable";
import { createHeroRow } from "../../lib/rows";

function Heroes({ id }) {
  const { heroes, isLoading } = usePlayerHeroes(id);

  if (isLoading) return <Spinner />;

  const columns = [
    {
      id: "hero",
      label: "Hero",
      property: "hero",
    },
    {
      id: "games",
      label: "Total Games",
      property: "games",
    },
    {
      id: "wins",
      label: "Wins",
      property: "wins",
    },
  ];
  const rows = heroes.map((hero) => createHeroRow(hero));

  return <DataTable columns={columns} rows={rows} />;
}

export default Heroes;
