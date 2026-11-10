import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  VIEWED_PLAYERS_KEY,
  VIEWED_PLAYERS_LIMIT,
  useViewedPlayers,
} from "./useViewedPlayers";

const player = (i: number) => ({
  account_id: i,
  personaname: `Player ${i}`,
  avatarfull: null,
});

describe("useViewedPlayers", () => {
  beforeEach(() => localStorage.clear());

  it("starts empty", () => {
    const { result } = renderHook(() => useViewedPlayers());
    expect(result.current.players).toEqual([]);
  });

  it("records newest first, deduplicates and caps the list", () => {
    const { result } = renderHook(() => useViewedPlayers());
    act(() => {
      for (let i = 1; i <= VIEWED_PLAYERS_LIMIT + 2; i++) {
        result.current.record(player(i));
      }
      result.current.record(player(5));
    });
    const ids = result.current.players.map((p) => p.account_id);
    expect(ids).toEqual([5, 8, 7, 6, 4, 3]);
    expect(JSON.parse(localStorage.getItem(VIEWED_PLAYERS_KEY)!)).toHaveLength(
      VIEWED_PLAYERS_LIMIT,
    );
  });

  it("shares state between hook instances", () => {
    const a = renderHook(() => useViewedPlayers());
    const b = renderHook(() => useViewedPlayers());
    act(() => a.result.current.record(player(1)));
    expect(b.result.current.players).toEqual([player(1)]);
  });

  it("clears the list and the storage key", () => {
    const { result } = renderHook(() => useViewedPlayers());
    act(() => result.current.record(player(1)));
    act(() => result.current.clear());
    expect(result.current.players).toEqual([]);
    expect(localStorage.getItem(VIEWED_PLAYERS_KEY)).toBeNull();
  });

  it("ignores corrupt or malformed storage", () => {
    localStorage.setItem(VIEWED_PLAYERS_KEY, "{not json");
    const { result, rerender } = renderHook(() => useViewedPlayers());
    expect(result.current.players).toEqual([]);

    localStorage.setItem(
      VIEWED_PLAYERS_KEY,
      JSON.stringify([player(1), { account_id: "x" }, null]),
    );
    rerender();
    expect(result.current.players).toEqual([player(1)]);
  });
});
