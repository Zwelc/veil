import { type NextRequest } from "next/server";
import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";

import { heroes } from "dotaconstants";
import { IHero } from "@/models/hero";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("date");

  let url = `${PLAYER_URL}/${params.id}/heroes?significant=0`;
  if (query) {
    url += `&date=${query}`;
  }
  const res = await fetch(url);
  const data = await res.json();

  const heroList: IHero[] = data.map((hero: any) => {
    const selectedHero = heroes[hero.hero_id];
    const heroImg = `${IMAGE_CDN}${selectedHero.img}`;
    return {
      id: hero.hero_id,
      image: heroImg,
      name: selectedHero.localized_name,
      games: hero.games,
      gamesWith: hero.with_games,
      gamesAgainst: hero.against_games,
      wins: hero.win,
      winsWith: hero.with_win,
      winsAgainst: hero.against_win,
      lastPlayed: hero.last_played,
    };
  });

  return Response.json(heroList);
}
