import { BASE_URL } from "@/lib/constants";
import { detectProfanity } from "@/lib/utils";

interface ProPlayer {
  avatar: string | null;
  personaname: string;
  [key: string]: unknown;
}

export async function GET() {
  const res = await fetch(`${BASE_URL}/proPlayers`);
  const data: ProPlayer[] = await res.json();
  const filteredData = data
    .filter((player) => player.avatar !== null)
    .map((player) => ({
      ...player,
      personaname: detectProfanity(player.personaname),
    }));

  return Response.json(filteredData);
}
