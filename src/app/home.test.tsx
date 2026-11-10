import { describe, expect, it, vi } from "vitest";
import type { DehydratedState } from "@tanstack/react-query";
import type { ReactElement } from "react";
import nextConfig from "../../next.config";
import { proPlayerQueries } from "@/lib/queries";
import type { IProScene } from "@/models/scene";
import { CACHE_TTL, OpenDota } from "@/server/opendota";
import Home, { revalidate } from "./page";

const emptyScene: IProScene = {
  activeWeek: 0,
  activeMonth: 0,
  countriesMonth: 0,
  listed: 0,
  topCountries: [],
  updatedAt: null,
};

/** Finds the HydrationBoundary's dehydrated state in the server component's element tree. */
function findState(node: ReactElement): DehydratedState | undefined {
  const props = node.props as { state?: DehydratedState; children?: unknown };
  if (props.state) return props.state;
  const children = Array.isArray(props.children) ? props.children : [props.children];
  for (const child of children) {
    if (child && typeof child === "object" && "props" in child) {
      const found = findState(child as ReactElement);
      if (found) return found;
    }
  }
}

describe("Home page (server component)", () => {
  it("is statically regenerated on the pro-player cadence", () => {
    expect(revalidate).toBe(CACHE_TTL.proPlayers);
  });

  it("seeds pro players under the client's query key from one landing call", async () => {
    const pros = [
      { account_id: 1, personaname: "Pro", avatarfull: null, last_match_time: null },
    ];
    const landing = vi
      .spyOn(OpenDota, "getProLanding")
      .mockResolvedValue({ pros, scene: emptyScene });
    const proList = vi.spyOn(OpenDota, "getProPlayers");
    const state = findState(await Home());
    const query = state?.queries.find(
      (q) => JSON.stringify(q.queryKey) === JSON.stringify(proPlayerQueries.list().queryKey),
    );
    expect(query?.state.data).toEqual(pros);
    expect(landing).toHaveBeenCalledTimes(1);
    expect(proList).not.toHaveBeenCalled();
  });

  it("still renders when OpenDota is down (client fetches later)", async () => {
    vi.spyOn(OpenDota, "getProLanding").mockRejectedValue(new Error("down"));
    const state = findState(await Home());
    expect(state?.queries ?? []).toHaveLength(0);
  });
});

describe("next.config", () => {
  it("serves images unoptimized (no paid image optimization)", () => {
    expect(nextConfig.images?.unoptimized).toBe(true);
  });
});
