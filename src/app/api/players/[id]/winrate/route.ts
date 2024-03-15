import { API } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API}/players/${params.id}/wl`);
  const data = await res.json();

  return Response.json(data);
}
