import { CACHE_TTL, OpenDota } from "@/server/opendota";
import { withPlayerRoute } from "@/server/route";

export const GET = withPlayerRoute((id) => OpenDota.getProfile(id), CACHE_TTL.profile);
