export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`https://api.opendota.com/api/players/${params.id}`);
  const data = await res.json();

  return Response.json({ data });
}
