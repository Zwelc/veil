import "server-only";
import { isValidAccountId, HttpError } from "@/server/opendota/http";

type Params = Record<string, string | string[]>;
type Context<P extends Params> = { params: Promise<P> };

/** JSON response with a CDN cache header. `ttl` 0 → never cached. */
export function json(data: unknown, ttl = 0, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control":
        ttl > 0
          ? `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 6}`
          : "no-store",
    },
  });
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return json({ error: error.message }, 0, error.status);
  }
  console.error(error);
  return json({ error: "Something went wrong." }, 0, 500);
}

/** Wraps a handler with param resolution, error mapping and caching headers. */
export function withRoute<P extends Params>(
  handler: (request: Request, params: P) => Promise<unknown>,
  ttl = 0,
) {
  return async (request: Request, context: Context<P>) => {
    try {
      return json(await handler(request, await context.params), ttl);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

/** Like withRoute, but validates the `[id]` segment and passes the query string. */
export function withPlayerRoute<P extends Params & { id: string }>(
  handler: (
    id: string,
    query: URLSearchParams,
    params: P,
  ) => Promise<unknown>,
  ttl = 0,
) {
  return withRoute<P>((request, params) => {
    if (!isValidAccountId(params.id)) {
      throw new HttpError(400, "Invalid Steam account ID.");
    }
    return handler(params.id, new URL(request.url).searchParams, params);
  }, ttl);
}
