import { heroes, lobby_type } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${params.id}/heroes`
  );
  const data = await res.json();

  const heroList = data.map((hero) => {
    const selectedHero = heroes[hero.hero_id];
    const heroImg = `https://cdn.cloudflare.steamstatic.com${selectedHero.img}`;
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
