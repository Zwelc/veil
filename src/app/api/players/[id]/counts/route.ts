/* eslint-disable @typescript-eslint/no-explicit-any */
import { PLAYER_URL } from "@/lib/constants";
import { Capitalize } from "@/lib/format";
import { lobby_type, patch, game_mode } from "dotaconstants";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
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
    const patchData = data.patch[patch.id];

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
