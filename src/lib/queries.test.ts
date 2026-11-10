import { describe, expect, it, vi } from "vitest";
import { veilApi } from "@/lib/api/veil";
import { playerQueries, proPlayerQueries, searchQueries } from "./queries";

describe("playerQueries", () => {
  const id = "42";
  const factories = [
    playerQueries.profile(id),
    playerQueries.heroes(id, 90),
    playerQueries.matches(id),
    playerQueries.recent(id),
    playerQueries.counts(id),
    playerQueries.winLoss(id),
    playerQueries.totals(id),
    playerQueries.insight(id, "peers"),
  ];

  it("scopes every player key under playerQueries.all(id) for bulk invalidation", () => {
    for (const { queryKey } of factories) {
      expect(queryKey.slice(0, 2)).toEqual(["player", id]);
    }
  });

  it("gives every query a distinct key", () => {
    const keys = factories.map(({ queryKey }) => JSON.stringify(queryKey));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("treats date 0 and undefined as the same heroes query (one request)", () => {
    expect(playerQueries.heroes(id, 0).queryKey).toEqual(
      playerQueries.heroes(id).queryKey,
    );
    expect(playerQueries.heroes(id, 90).queryKey).not.toEqual(
      playerQueries.heroes(id).queryKey,
    );
  });

  it("queryFns delegate to the veilApi facade", async () => {
    const spy = vi.spyOn(veilApi.players, "heroes").mockResolvedValue([]);
    const { queryFn } = playerQueries.heroes(id, 90);
    await (queryFn as () => Promise<unknown>)();
    expect(spy).toHaveBeenCalledWith(id, { date: 90 });

    const insight = vi.spyOn(veilApi.players, "insight").mockResolvedValue([]);
    await (playerQueries.insight(id, "histograms/kills").queryFn as () => Promise<unknown>)();
    expect(insight).toHaveBeenCalledWith(id, "histograms/kills");
  });
});

describe("pro player and search queries", () => {
  it("use stable, separate keys", () => {
    expect(proPlayerQueries.list().queryKey).toEqual(["proPlayers"]);
    expect(searchQueries.players("abc").queryKey).toEqual(["search", "abc"]);
  });
});
