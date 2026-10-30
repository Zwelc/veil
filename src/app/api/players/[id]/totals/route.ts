import { getPlayerEndpointURL } from "@/lib/opendota";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const res = await fetch(getPlayerEndpointURL(params.id, "totals", request));
  const data = await res.json();

  return Response.json(data);
}
