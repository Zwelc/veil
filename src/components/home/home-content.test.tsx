import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchContext } from "@/context/searchContext";
import { VIEWED_PLAYERS_KEY } from "@/hooks/useViewedPlayers";
import { veilApi } from "@/lib/api/veil";
import { RESULT_LIMIT } from "@/lib/constants";
import type { IPlayerSummary } from "@/models/player";
import { renderWithClient } from "../../../test/utils";
import FeatureStrip from "./feature-strip";
import HomeContent from "./home-content";

const player = (i: number, extra: Partial<IPlayerSummary> = {}): IPlayerSummary => ({
  account_id: i,
  personaname: `Pro ${i}`,
  avatarfull: null,
  last_match_time: null,
  ...extra,
});

const renderPage = (search = "") =>
  renderWithClient(
    <SearchContext.Provider value={{ search, setSearch: () => {} }}>
      <HomeContent features={<FeatureStrip />} />
    </SearchContext.Provider>,
  );

describe("HomeContent", () => {
  beforeEach(() => localStorage.clear());

  it("shows featured pro players with pagination", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue(
      Array.from({ length: RESULT_LIMIT + 2 }, (_, i) => player(i + 1)),
    );
    renderPage();
    expect(await screen.findByText("Featured pro players")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Pro 1" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: `View Pro ${RESULT_LIMIT + 1}` })).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(
      screen.getByRole("link", { name: `View Pro ${RESULT_LIMIT + 1}` }),
    ).toBeInTheDocument();
    // The outgoing page slides out before it is removed.
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("link", { name: "View Pro 1" }),
    );
    await waitFor(() =>
      expect(screen.getByText(/^Players/)).toHaveTextContent(
        `Players ${RESULT_LIMIT + 1}–${RESULT_LIMIT + 2} of ${RESULT_LIMIT + 2}`,
      ),
    );
  });

  it("crossfades from the showcase to search results", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([player(1)]);
    vi.spyOn(veilApi, "search").mockResolvedValue([player(3)]);
    const { rerender } = renderPage();
    expect(await screen.findByText("Featured pro players")).toBeInTheDocument();

    rerender(
      <SearchContext.Provider value={{ search: "miracle", setSearch: () => {} }}>
        <HomeContent features={<FeatureStrip />} />
      </SearchContext.Provider>,
    );
    expect(await screen.findByText("Players matching “miracle”")).toBeInTheDocument();
    expect(screen.queryByText("Five tabs on every profile")).toBeNull();
  });

  it("shows team tag and country badges on pros", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([
      player(1, { team_tag: "NGX", country_code: "SE" }),
    ]);
    renderPage();
    expect(await screen.findByText("NGX")).toBeInTheDocument();
    expect(screen.getByText("SE")).toHaveAttribute("title", "Sweden");
  });

  it("shows the feature strip when not searching", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    renderPage();
    expect(
      screen.getByRole("heading", { name: "Five tabs on every profile" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Insights" })).toBeInTheDocument();
    // Animated tiles keep list semantics.
    const tiles = screen.getAllByRole("listitem").filter((li) => li.querySelector("h3"));
    expect(tiles).toHaveLength(5);
  });

  it("places the scene after the pros in the showcase, and hides it while searching", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([player(1)]);
    vi.spyOn(veilApi, "search").mockResolvedValue([]);
    const scene = <section aria-label="Scene stub">scene</section>;
    const { rerender } = renderWithClient(
      <SearchContext.Provider value={{ search: "", setSearch: () => {} }}>
        <HomeContent features={<FeatureStrip />} scene={scene} />
      </SearchContext.Provider>,
    );
    const pros = await screen.findByRole("region", { name: "Featured pro players" });
    const stub = screen.getByRole("region", { name: "Scene stub" });
    expect(pros.compareDocumentPosition(stub) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    rerender(
      <SearchContext.Provider value={{ search: "miracle", setSearch: () => {} }}>
        <HomeContent features={<FeatureStrip />} scene={scene} />
      </SearchContext.Provider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByRole("region", { name: "Scene stub" }));
  });

  it("hides recently viewed when empty and shows it when populated", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    const { unmount } = renderPage();
    expect(screen.queryByText("Recently viewed")).toBeNull();
    unmount();

    localStorage.setItem(
      VIEWED_PLAYERS_KEY,
      JSON.stringify([{ account_id: 7, personaname: "Seen", avatarfull: null }]),
    );
    renderPage();
    expect(screen.getByText("Recently viewed")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Seen/ })).toHaveAttribute(
      "href",
      "/players/7",
    );

    // The section animates out before it is removed.
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    await waitForElementToBeRemoved(() => screen.queryByText("Recently viewed"));
    expect(localStorage.getItem(VIEWED_PLAYERS_KEY)).toBeNull();
  });

  it("replaces the showcase with results while searching", async () => {
    vi.spyOn(veilApi, "search").mockResolvedValue([player(3)]);
    renderPage("miracle");
    expect(await screen.findByText("Players matching “miracle”")).toBeInTheDocument();
    expect(screen.queryByText("Five tabs on every profile")).toBeNull();
  });

  it("offers a direct link for a pasted profile URL without requests", () => {
    const pros = vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    const search = vi.spyOn(veilApi, "search").mockResolvedValue([]);
    renderPage("https://www.opendota.com/players/86745912");
    expect(screen.getByRole("link", { name: /Go to player #86745912/ })).toHaveAttribute(
      "href",
      "/players/86745912",
    );
    expect(pros).not.toHaveBeenCalled();
    expect(search).not.toHaveBeenCalled();
  });

  it("shows an error state when the API fails", async () => {
    vi.spyOn(veilApi, "proPlayers").mockRejectedValue(new Error("down"));
    renderPage();
    expect(await screen.findByText("Player search is unavailable")).toBeInTheDocument();
  });

  it("shows an empty state when there are no players", async () => {
    vi.spyOn(veilApi, "proPlayers").mockResolvedValue([]);
    renderPage();
    expect(await screen.findByText("No featured players available")).toBeInTheDocument();
  });
});
