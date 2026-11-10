import { CACHE_TTL, OpenDota, RAW_PLAYER_ENDPOINTS } from "@/server/opendota";
import { HttpError, type Query } from "@/server/opendota/http";
import { withPlayerRoute } from "@/server/route";

type Handler = (id: string, query: Query) => Promise<unknown>;

/** Every player sub-endpoint the API exposes: one registry instead of one route file each. */
const GET_ENDPOINTS: Record<string, { get: Handler; ttl: number }> = {
  heroes: { get: OpenDota.getHeroes, ttl: CACHE_TTL.heroes },
  matches: { get: OpenDota.getMatches, ttl: CACHE_TTL.matches },
  recent: { get: (id) => OpenDota.getRecentMatches(id), ttl: CACHE_TTL.matches },
  counts: { get: OpenDota.getCounts, ttl: CACHE_TTL.counts },
  peers: { get: OpenDota.getPeers, ttl: CACHE_TTL.insights },
  pros: { get: OpenDota.getPros, ttl: CACHE_TTL.insights },
  wordcloud: { get: OpenDota.getWordCloud, ttl: CACHE_TTL.insights },
  rankings: { get: (id) => OpenDota.getRankings(id), ttl: CACHE_TTL.insights },
  ...Object.fromEntries(
    Object.entries(RAW_PLAYER_ENDPOINTS)
      .filter(([name]) => name !== "histograms")
      .map(([name, ttl]) => [
        name,
        { get: (id: string, query: Query) => OpenDota.getRaw(id, name, query), ttl },
      ]),
  ),
};

type Params = { id: string; endpoint: string[] };

function resolve(endpoint: string[]) {
  const [name, field] = endpoint;
  if (endpoint.length === 2 && name === "histograms" && /^\w+$/.test(field)) {
    return {
      get: (id: string, query: Query) =>
        OpenDota.getRaw(id, `histograms/${field}`, query),
      ttl: CACHE_TTL.insights,
    };
  }
  return endpoint.length === 1 ? GET_ENDPOINTS[name] : undefined;
}

const notFound = () => {
  throw new HttpError(404, "Unknown player endpoint.");
};

export async function GET(
  request: Request,
  context: { params: Promise<Params> },
) {
  const route = resolve((await context.params).endpoint);
  return withPlayerRoute<Params>(
    (id, query) => (route ? route.get(id, query) : notFound()),
    route?.ttl,
  )(request, context);
}

export const POST = withPlayerRoute<Params>((id, _query, { endpoint }) =>
  endpoint.length === 1 && endpoint[0] === "refresh"
    ? OpenDota.refresh(id)
    : notFound(),
);
