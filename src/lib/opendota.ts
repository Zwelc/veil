import { PLAYER_URL } from "@/lib/constants";

export function getPlayerEndpointURL(
  id: string,
  endpoint: string,
  request: Request,
  defaults: Record<string, string> = {},
) {
  const url = new URL(`${PLAYER_URL}/${encodeURIComponent(id)}/${endpoint}`);

  new URL(request.url).searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  for (const [key, value] of Object.entries(defaults)) {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}
