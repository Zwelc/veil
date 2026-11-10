import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HistogramView } from "./histogram-view";
import { PeopleView } from "./people-view";
import { RankingsView } from "./rankings-view";
import { RatingsView } from "./ratings-view";
import { WardMapView } from "./ward-map-view";
import { WordCloudView } from "./word-cloud-view";

describe("PeopleView", () => {
  const peers = [
    { account_id: 1, personaname: "Alice", games: 10, win: 6, last_played: 1_700_000_000 },
    { account_id: 2, personaname: "Bob", games: 4, win: 1, last_played: 1_700_000_000 },
  ];

  it("lists peers with links and win rates", () => {
    render(<PeopleView rows={peers} pros={false} />);
    expect(screen.getByText("2 players, sorted by games together")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alice" })).toHaveAttribute("href", "/players/1");
    expect(screen.getByText("60.0%")).toBeInTheDocument();
  });

  it("filters by search and shows an empty state", async () => {
    render(<PeopleView rows={peers} pros={false} />);
    const input = screen.getByLabelText("Search players");
    await userEvent.type(input, "bob");
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "zzz");
    expect(screen.getByText("No players match your search.")).toBeInTheDocument();
  });
});

describe("HistogramView", () => {
  it("summarises the distribution", () => {
    render(
      <HistogramView
        field="kills"
        rows={[
          { x: 0, games: 3, win: 1 },
          { x: 5, games: 1, win: 1 },
          { x: 10, games: 0, win: 0 },
        ]}
      />,
    );
    expect(screen.getByText("Kills distribution")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument(); // matches represented
    expect(screen.getByText("50.0%")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2); // empty buckets dropped
  });

  it("shows an empty state", () => {
    render(<HistogramView field="kills" rows={[]} />);
    expect(
      screen.getByText("No distribution data is available for this stat."),
    ).toBeInTheDocument();
  });
});

describe("WardMapView", () => {
  it("counts observer and sentry placements", () => {
    render(
      <WardMapView
        data={{ obs: { "100": { "120": 3 } }, sen: { "90": { "80": 2, "81": 1 } } }}
      />,
    );
    // obs: 3 at one spot; sen: 2 + 1 across two spots → both maps total 3.
    expect(screen.getAllByText("3 recorded placements")).toHaveLength(2);
    expect(screen.getByText("Observer wards")).toBeInTheDocument();
    expect(screen.getByText("Sentry wards")).toBeInTheDocument();
  });

  it("handles missing data", () => {
    render(<WardMapView data={null} />);
    expect(screen.getByText("Ward placements are not available.")).toBeInTheDocument();
  });
});

describe("WordCloudView", () => {
  const data = {
    my_word_counts: { gg: 5, wp: 2 },
    all_word_counts: { gg: 9, ez: 4, report: 1 },
  };

  it("switches between the player's words and all chat", async () => {
    render(<WordCloudView data={data} />);
    expect(screen.getByText(/Top 2 of 2 words · 7 occurrences/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "All chat" }));
    expect(screen.getByText(/Top 3 of 3 words · 14 occurrences/)).toBeInTheDocument();
  });

  it("shows an empty state", () => {
    render(<WordCloudView data={{}} />);
    expect(
      screen.getByText("No chat words are available for this selection."),
    ).toBeInTheDocument();
  });
});

describe("RatingsView", () => {
  it("lists rank changes newest first", () => {
    render(
      <RatingsView
        rows={[
          { time: 1_600_000_000, rank_tier: 41 },
          { time: 1_700_000_000, rank_tier: 52, match_id: 99 },
        ]}
      />,
    );
    const tiers = screen.getAllByText(/Rank tier/).map((node) => node.textContent);
    expect(tiers).toEqual(["Rank tier 52", "Rank tier 41"]);
    expect(screen.getByText("Match #99")).toBeInTheDocument();
  });

  it("shows an empty state", () => {
    render(<RatingsView rows={[]} />);
    expect(screen.getByText("No rank history yet")).toBeInTheDocument();
  });
});

describe("RankingsView", () => {
  const rows = Array.from({ length: 14 }, (_, i) => ({
    hero_id: i + 1,
    name: `Hero ${i + 1}`,
    image: null,
    score: 1000 + i,
    percent_rank: i / 20,
  }));

  it("sorts by percentile and expands past the top 12", async () => {
    render(<RankingsView rows={rows} />);
    expect(screen.getByText("Hero 14")).toBeInTheDocument(); // best percentile first
    expect(screen.queryByText("Hero 1")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Show all 14" }));
    expect(screen.getByText("Hero 1")).toBeInTheDocument();
  });

  it("shows an empty state", () => {
    render(<RankingsView rows={[]} />);
    expect(screen.getByText("No hero rankings available")).toBeInTheDocument();
  });
});
