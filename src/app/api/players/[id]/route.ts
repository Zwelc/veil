import { PLAYER_URL } from "@/lib/constants";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const res = await fetch(`${PLAYER_URL}/${params.id}`);
  const data = await res.json();

  return Response.json({ data });
}
