import { act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { veilApi } from "@/lib/api/veil";
import { playerQueries } from "@/lib/queries";
import { SearchContext } from "@/context/searchContext";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constants";
import type { IMatch } from "@/models/match";
import { makeTestQueryClient, renderHookWithClient } from "../../test/utils";
import { usePlayerHeroes, useRefreshPlayer } from "./usePlayer";
import { useRecent } from "./useRecent";
import { useSearchResults } from "./useSearch";

const match = (won: boolean, kills: number): IMatch =>
  ({ match_id: kills, won, kills, deaths: 1, assists: 2, gold_per_min: 500, xp_per_min: 600 }) as IMatch;

describe("usePlayerHeroes", () => {
  it("is pending, then resolves with data from the facade", async () => {
    vi.spyOn(veilApi.players, "heroes").mockResolvedValue([{ id: 1 }] as never);
    const { result } = renderHookWithClient(() => usePlayerHeroes("1"));
    expect(result.current.isPending).toBe(true);
    await waitFor(() => expect(result.current.data).toEqual([{ id: 1 }]));
  });
});

describe("useRecent", () => {
  it("derives form and averages from recent matches", async () => {
    vi.spyOn(veilApi.players, "recent").mockResolvedValue([
      match(true, 10),
      match(false, 2),
    ]);
    const { result } = renderHookWithClient(() => useRecent("1"));
    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current).toMatchObject({
      wins: 1,
      losses: 1,
      form: [true, false],
      averageKda: "6.0 / 1.0 / 2.0",
    });
  });
});

describe("useRefreshPlayer", () => {
  it("invalidates every cached query for that player only", async () => {
    vi.spyOn(veilApi.players, "refresh").mockResolvedValue({});
    const client = makeTestQueryClient();
    client.setQueryData(playerQueries.matches("1").queryKey, []);
    client.setQueryData(playerQueries.counts("1").queryKey, {} as never);
    client.setQueryData(playerQueries.matches("2").queryKey, []);

    const { result } = renderHookWithClient(() => useRefreshPlayer("1"), client);
    await act(() => result.current.mutateAsync());

    const state = (id: string, q: "matches" | "counts") =>
      client.getQueryState(playerQueries[q](id).queryKey);
    expect(state("1", "matches")?.isInvalidated).toBe(true);
    expect(state("1", "counts")?.isInvalidated).toBe(true);
    expect(state("2", "matches")?.isInvalidated).toBe(false);
  });
});

describe("useSearchResults", () => {
  function setup(initial: string) {
    const client = makeTestQueryClient();
    const value = { search: initial, setSearch: () => {} };
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
      </QueryClientProvider>
    );
    const hook = renderHook(() => useSearchResults(), { wrapper });
    return {
      ...hook,
      type: (text: string) => {
        value.search = text;
        hook.rerender();
      },
    };
  }

  it("shows pro players and never searches for short terms", async () => {
    const pros = vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    const search = vi.spyOn(veilApi, "search").mockResolvedValue([]);
    const { result } = setup("ab");
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isSearching).toBe(false);
    expect(pros).toHaveBeenCalledTimes(1);
    expect(search).not.toHaveBeenCalled();
  });

  it("debounces typing into a single search request", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    const search = vi.spyOn(veilApi, "search").mockResolvedValue([]);
    const { result, type } = setup("");

    for (const text of ["m", "mi", "mir", "mira", "miracle"]) {
      type(text);
      await act(() => vi.advanceTimersByTimeAsync(50));
    }
    expect(search).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS));
    await waitFor(() => expect(result.current.term).toBe("miracle"));
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith("miracle");
    vi.useRealTimers();
  });

  it("resolves a pasted profile link without any request", async () => {
    const pros = vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    const search = vi.spyOn(veilApi, "search").mockResolvedValue([]);
    const { result } = setup("https://www.dotabuff.com/players/86745912");
    await waitFor(() => expect(result.current.directId).toBe("86745912"));
    expect(result.current.isSearching).toBe(false);
    expect(search).not.toHaveBeenCalled();
    expect(pros).not.toHaveBeenCalled();
  });
});
