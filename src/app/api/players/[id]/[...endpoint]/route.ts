import { NextRequest } from "next/server";
import { getPlayerEndpointURL } from "@/lib/opendota";

const GET_ENDPOINTS = new Set([
  "wl",
  "recentMatches",
  "matches",
  "heroes",
  "peers",
  "pros",
  "totals",
  "counts",
  "wardmap",
  "wordcloud",
  "ratings",
  "rankings",
]);

type RouteContext = {
  params: Promise<{ id: string; endpoint: string[] }>;
};

function validAccountId(id: string) {
  const accountId = Number(id);
  return (
    /^\d+$/.test(id) &&
    Number.isSafeInteger(accountId) &&
    accountId <= 4294967295
  );
}

function validEndpoint(endpoint: string[], method: "GET" | "POST") {
  if (
    method === "GET" &&
    endpoint.length === 2 &&
    endpoint[0] === "histograms"
  ) {
    return /^[a-zA-Z0-9_]+$/.test(endpoint[1]);
  }

  return (
    endpoint.length === 1 &&
    (method === "GET"
      ? GET_ENDPOINTS.has(endpoint[0])
      : endpoint[0] === "refresh")
  );
}

async function proxyPlayerEndpoint(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "POST",
) {
  const { id, endpoint } = await context.params;

  if (!validAccountId(id)) {
    return Response.json(
      { error: "Invalid Steam account ID." },
      { status: 400 },
    );
  }

  if (!validEndpoint(endpoint, method)) {
    return Response.json(
      { error: "Unknown player endpoint." },
      { status: 404 },
    );
  }

  const path = endpoint.map(encodeURIComponent).join("/");

  try {
    const upstream = await fetch(getPlayerEndpointURL(id, path, request), {
      method,
      cache: "no-store",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { error: "OpenDota is temporarily unavailable." },
      { status: 502 },
    );
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return proxyPlayerEndpoint(request, context, "GET");
}

export function POST(request: NextRequest, context: RouteContext) {
  return proxyPlayerEndpoint(request, context, "POST");
}
