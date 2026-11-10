import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SearchProvider } from "@/context/searchContext";
import type { IPlayerSummary } from "@/models/player";
import type { IProScene } from "@/models/scene";
import { renderWithClient } from "../../../test/utils";
import Hero, { BOARD_SIZE } from "./hero";

const pro = (i: number, time: string): IPlayerSummary => ({
  account_id: i,
  personaname: `Pro ${i}`,
  avatarfull: null,
  last_match_time: time,
  team_tag: i === 1 ? "OG" : null,
  country_code: null,
});

const scene: IProScene = {
  activeWeek: 2674,
  activeMonth: 3480,
  countriesMonth: 168,
  listed: 5765,
  topCountries: [{ code: "RU", count: 1093 }],
  updatedAt: "2026-11-10T15:58:27.000Z",
};

const renderHero = (props: Parameters<typeof Hero>[0] = {}) =>
  renderWithClient(
    <SearchProvider>
      <Hero {...props} />
    </SearchProvider>,
  );

describe("Hero", () => {
  it("renders the headline, search and supported-link hint", () => {
    renderHero();
    expect(
      screen.getByRole("heading", { level: 1, name: /Every match leaves a trail/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByText(/OpenDota, Dotabuff, STRATZ or Steam profile link/)).toBeInTheDocument();
  });

  it("is always dark, whatever the site theme", () => {
    const { container } = renderHero();
    expect(container.querySelector("section")).toHaveClass("dark");
  });

  it("never fades the headline, so the LCP text is visible before hydration", () => {
    renderHero();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.style.opacity).toBe("");
  });

  it("lists the most recently active pros with times, labelled as of the last update", () => {
    const pros = Array.from({ length: BOARD_SIZE + 3 }, (_, i) =>
      pro(i + 1, i === 0 ? "2026-11-10T15:58:00Z" : "2026-11-09T20:00:00Z"),
    );
    renderHero({ pros, scene });
    const board = screen.getByRole("region", { name: "Recently active" });
    expect(within(board).getAllByRole("link")).toHaveLength(BOARD_SIZE);
    expect(within(board).getByRole("link", { name: /Pro 1/ })).toHaveAttribute(
      "href",
      "/players/1",
    );
    expect(within(board).getByText("as of 15:58 UTC")).toBeInTheDocument();
    expect(within(board).getByText("15:58")).toBeInTheDocument();
    expect(within(board).getAllByText("9 Nov")).toHaveLength(BOARD_SIZE - 1);
    expect(within(board).getByText("OG")).toBeInTheDocument();
    // Never claims to be live: the page is regenerated every 6 hours.
    expect(screen.queryByText(/live|just finished/i)).toBeNull();
  });

  it("shows the scene counts as a scoreboard", () => {
    renderHero({ pros: [pro(1, scene.updatedAt!)], scene });
    for (const value of ["2,674", "3,480", "168", "5,765"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
    expect(screen.getByText("pros played in the last 7 days")).toBeInTheDocument();
  });

  it("falls back to headline and search when there is no pro data", () => {
    renderHero();
    expect(screen.queryByRole("region", { name: "Recently active" })).toBeNull();
    expect(screen.queryByText("countries this month")).toBeNull();
  });

  it("marks the search box focused for its spring", async () => {
    renderHero();
    const box = screen.getByRole("searchbox").parentElement!;
    expect(box).toHaveAttribute("data-focused", "false");
    await userEvent.click(screen.getByRole("searchbox"));
    expect(box).toHaveAttribute("data-focused", "true");
    await userEvent.tab();
    await userEvent.tab();
    expect(box).toHaveAttribute("data-focused", "false");
  });
});
