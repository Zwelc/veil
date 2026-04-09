import { BASE_URL } from "@/lib/constants";
import { detectProfanity } from "@/lib/utils";

export async function GET() {
  const res = await fetch(`${BASE_URL}/proPlayers`);
  const data = await res.json();
  const filteredData = data
    .filter((p: any) => p.avatar !== null)
    .map((p: any) => ({ ...p, personaname: detectProfanity(p.personaname) }));

  return Response.json(filteredData);
}
