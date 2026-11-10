import { CACHE_TTL, OpenDota } from "@/server/opendota";
import { withRoute } from "@/server/route";

export const GET = withRoute(() => OpenDota.getProPlayers(), CACHE_TTL.proPlayers);
