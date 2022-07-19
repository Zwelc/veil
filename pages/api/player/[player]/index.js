import { PLAYERURL } from "../../../../lib/fetcher";

export default async function handler(req, res) {
  const player = req.query.player;

  const request = await fetch(`${PLAYERURL}/${player}`);
  const response = await request.json();

  res.status(200).json(response);
}
