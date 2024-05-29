import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";
import { Capitalize } from "@/lib/format";
import { isRadiant } from "@/lib/playerslot";
import { convertHMS } from "@/lib/time";
import { heroes, lobby_type, patch, game_mode } from "dotaconstants";

type GameMode = {
  name: string;
  win: number;
  games: number;
};
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${PLAYER_URL}/${params.id}/counts?significant=0`);
  const data = await res.json();

  const lobbyList = Object.entries(data.lobby_type).map((entry: any[]) => {
    const info = lobby_type[entry[0]];

    return {
      name: info.name
        .slice(10)
        .split("_")
        .map((word: string) => Capitalize(word))
        .join(" "),
      games: entry[1].games,
      win: entry[1].win,
    };
  });
  const modeList = Object.entries(data.game_mode).map((entry: any[]) => {
    const info = game_mode[entry[0]];

    return {
      name: info.name
        .slice(10)
        .split("_")
        .map((word: string) => Capitalize(word))
        .join(" "),
      games: entry[1].games,
      win: entry[1].win,
    };
  });

  const patchList = patch.map((patch: any) => {
    let patchData = data.patch[patch.id];

    return {
      ...patch,
      win: patchData ? patchData.win : 0,
      games: patchData ? patchData.games : 0,
    };
  });

  return Response.json({
    patch: patchList,
    lobbyType: lobbyList,
    gameMode: modeList,
  });
}
