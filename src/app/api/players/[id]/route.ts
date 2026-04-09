import { PLAYER_URL } from "@/lib/constants";
import { detectProfanity } from "@/lib/utils";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const res = await fetch(`${PLAYER_URL}/${params.id}`);
  const data = await res.json();
  const filteredData = JSON.parse(detectProfanity(JSON.stringify(data)));
  return Response.json({ data: filteredData });
}
