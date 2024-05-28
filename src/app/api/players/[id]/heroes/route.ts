import { type NextRequest } from "next/server";
import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";

import { heroes } from "dotaconstants";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("date");

  let url = `${PLAYER_URL}/${params.id}/heroes?significant=0`;
  if (query) {
    url += `&date=${query}`;
  }
  const res = await fetch(url);
  const data = await res.json();

  const heroList = data.map((hero: any) => {
    const selectedHero = heroes[hero.hero_id];
    const heroImg = `${IMAGE_CDN}${selectedHero.img}`;
    return {
      id: hero.hero_id,
      image: heroImg,
      name: selectedHero.localized_name,
      games: hero.games,
      wins: hero.win,
    };
  });

  return Response.json(heroList);
}
