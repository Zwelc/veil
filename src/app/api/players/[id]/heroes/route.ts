import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";
import { heroes } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${PLAYER_URL}/${params.id}/heroes`);
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
