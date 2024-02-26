import HeroList from "@/components/hero-list";
import ListItem from "@/components/list-item";
import RecentList from "@/components/recent-list";
import { convertHMS } from "@/utils/time";

export default async function Page({ params }: { params: { id: string } }) {
  const winrate = await getPlayerWinrate(params.id);
  const totals = await getPlayerTotals(params.id);

  return (
    <>
      <div className="tile flex flex-col items-center justify-center">
        <dt className="mb-2 text-3xl font-extrabold">
          {winrate.win + winrate.lose}
        </dt>
        <dd className="">Total Matches</dd>
      </div>
      <div className="tile flex flex-col items-center justify-center">
        <dt className="mb-2 text-3xl font-extrabold">{winrate.win}</dt>
        <dd className="">Total Wins</dd>
      </div>

      <HeroList id={params.id} />

      {totals
        ?.filter(
          (entry: any) => entry.field == "kills" || entry.field == "deaths"
        )
        .map((entry: any) => (
          <div
            key={entry.field}
            className="tile flex flex-col items-center justify-center"
          >
            <dt className="mb-2 text-3xl font-extrabold">
              {entry.field === "duration"
                ? convertHMS(entry.sum)
                : (entry.sum / entry.n).toFixed(2)}
            </dt>
            <dd className="">Average {entry.field}</dd>
          </div>
        ))}
      <RecentList id={params.id} />
    </>
  );
}

async function getPlayerWinrate(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}/winrate`
  );
  const winrate = await res.json();

  return winrate;
}
async function getPlayerTotals(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}/totals`
  );
  const totals = await res.json();

  return totals;
}
