import { ScoreCard } from "@/components/card";
import { convertHMS } from "@/utils/time";
import { countries } from "dotaconstants";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const heroes = await getPlayerHeroes(params.id);
  const winrate = await getPlayerWinrate(params.id);
  const totals = await getPlayerTotals(params.id);
  const recent = await getPlayerRecent(params.id);

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

      <div className="block tile p-4  row-span-4 col-span-1 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none ">
            Most Played Heroes
          </h5>
        </div>
        <ul className="divide-y divide-gray-200 ">
          {heroes.length > 0
            ? heroes.slice(0, 11).map((hero: any) => (
                <li key={hero.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={hero.image}
                        height={29}
                        width={59}
                        alt={hero.localized_name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium  truncate ">
                        {hero.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold ">
                      {hero.games}
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>

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
      <div className="block tile  p-4  col-span-2 row-span-2 w-full h-full">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none ">Recent Matches</h5>
        </div>
        <ul className="divide-y divide-gray-200 ">
          {recent.length > 0
            ? recent.slice(0, 5).map((match: any) => (
                <li key={match.match_id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={match.image}
                        height={29}
                        width={59}
                        alt={match.localized_name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium  truncate ">
                        {match.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold ">
                      {match.result}
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}

async function getPlayerHeroes(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}/heroes`
  );
  const heroes = await res.json();

  return heroes;
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
async function getPlayerRecent(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}/recent`
  );
  const totals = await res.json();

  return totals;
}
