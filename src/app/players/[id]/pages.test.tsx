import { act, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";
import { veilApi } from "@/lib/api/veil";
import type { IHero } from "@/models/hero";
import type { IMatch } from "@/models/match";
import { renderWithClient } from "../../../../test/utils";
import HeroesPage from "./heroes/page";
import MatchesPage from "./matches/page";

const params = Promise.resolve({ id: "1" });
/** Pages call use(params), which suspends, so render inside an awaited act. */
const renderRoute = (Page: typeof HeroesPage) =>
  act(async () => {
    renderWithClient(
      <Suspense fallback={null}>
        <Page params={params} />
      </Suspense>,
    );
  });

const hero = (id: number, name: string, games: number, wins: number): IHero => ({
  id,
  slug: name.toLowerCase(),
  image: `https://cdn.example/${id}.png`,
  name,
  games,
  wins,
  gamesWith: 0,
  winsWith: 0,
  gamesAgainst: 0,
  winsAgainst: 0,
  lastPlayed: 1_700_000_000,
});

const match = (id: number, won: boolean): IMatch =>
  ({
    match_id: id,
    name: "Axe",
    image: "https://cdn.example/axe.png",
    won,
    ranked: true,
    gameMode: "All Pick",
    duration: 2405,
    start_time: 1_700_000_000,
    kills: 5,
    deaths: 5,
    assists: 10,
  }) as IMatch;

describe("Heroes page", () => {
  it("ranks top heroes by games and summarises picks", async () => {
    vi.spyOn(veilApi.players, "heroes").mockResolvedValue([
      hero(2, "Axe", 10, 5),
      hero(1, "Pudge", 30, 15),
    ]);
    await renderRoute(HeroesPage);
    expect(await screen.findByText("Signature pick")).toBeInTheDocument();
    expect(
      screen.getByText(/2 heroes · 40 picks · 50.0% overall win rate/),
    ).toBeInTheDocument();
  });

  it("shows an error state", async () => {
    vi.spyOn(veilApi.players, "heroes").mockRejectedValue(new Error("x"));
    await renderRoute(HeroesPage);
    expect(
      await screen.findByText("Could not load hero statistics. Please try again."),
    ).toBeInTheDocument();
  });
});

describe("Matches page", () => {
  it("shows a loading state instead of 'No results' while pending", async () => {
    vi.spyOn(veilApi.players, "matches").mockReturnValue(new Promise(() => {}));
    await renderRoute(MatchesPage);
    expect(await screen.findByText("Loading matches…")).toBeInTheDocument();
    expect(screen.queryByText("No results.")).not.toBeInTheDocument();
  });

  it("summarises recent form and lists matches", async () => {
    vi.spyOn(veilApi.players, "matches").mockResolvedValue([
      match(1, true),
      match(2, true),
      match(3, false),
    ]);
    await renderRoute(MatchesPage);
    expect(await screen.findByText("2W – 1L")).toBeInTheDocument();
    expect(screen.getByText("3 matches")).toBeInTheDocument();
    expect(screen.getAllByText("Victory")).toHaveLength(2);
    expect(screen.getAllByText("40:05")).toHaveLength(3);
  });
});
