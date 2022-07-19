import { PLAYERURL } from "../../../../lib/fetcher";
import { lobby_type, patch } from "dotaconstants";

export default async function handler(req, res) {
  const player = req.query.player;

  const request = await fetch(`${PLAYERURL}/${player}/counts`);
  const response = await request.json();

  const lobbies = Object.keys(response.lobby_type).map((lobby) => {
    const lobbyType = lobby_type[lobby];

    return {
      name: lobbyType.name.slice(11),
      ...response.lobby_type[lobby],
    };
  });

  const patches = Object.keys(response.patch).map((patchId) => {
    const currentPatch = patch.find((item) => Number(patchId) == item.id);

    return {
      name: currentPatch.name,
      date: currentPatch.date,
      ...response.patch[patchId],
    };
  });

  res.status(200).json({ ...response, lobby_type: lobbies, patch: patches });
}
