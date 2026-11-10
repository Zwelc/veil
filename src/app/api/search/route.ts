import { CACHE_TTL, OpenDota } from "@/server/opendota";
import { MIN_SEARCH_LENGTH } from "@/lib/constants";
import { withRoute } from "@/server/route";

export const GET = withRoute(async (request) => {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().slice(0, 64);
  // Short queries return nothing without spending an upstream call.
  return q.length < MIN_SEARCH_LENGTH ? [] : OpenDota.search(q);
}, CACHE_TTL.search);
