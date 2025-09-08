import { PLAYER_URL } from "@/lib/constants";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const res = await fetch(`${PLAYER_URL}/${params.id}/counts`);
  const data = await res.json();

  const sides = [
    {
      name: "Radiant",
      games: data.is_radiant[1].games,
      win: data.is_radiant[1].win,
    },
    {
      name: "Dire",
      games: data.is_radiant[0].games,
      win: data.is_radiant[0].win,
    },
  ];

  return Response.json(sides);
}
