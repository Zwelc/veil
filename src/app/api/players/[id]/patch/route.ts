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

  const patchList = patch.map((patch: any) => {
    let patchData = data.patch[patch.id];

    return {
      ...patch,
      win: patchData ? patchData.win : 0,
      games: patchData ? patchData.games : 0,
    };
  });

  return Response.json(patchList);
}
