import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";
import { isRadiant } from "@/lib/playerslot";
import { convertHMS } from "@/lib/time";
import { heroes, lobby_type, patch } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
