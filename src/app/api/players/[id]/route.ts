import { PLAYER_URL } from "@/lib/constants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${PLAYER_URL}/${params.id}`);
  const data = await res.json();

  return Response.json({ data });
}
