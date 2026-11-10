import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import PlayerGrid from "@/components/players/grid";
import { VIEWED_PLAYERS_KEY } from "@/hooks/useViewedPlayers";
import { renderWithClient } from "../../../test/utils";
import FeatureStrip from "./feature-strip";
import RecentlyViewed from "./recently-viewed";

/**
 * Staggered items must start hidden (opacity 0) on first render. If an item also
 * carries whileHover/whileTap it stops inheriting its parent's stagger and renders
 * fully visible with no entrance, which is the regression these tests catch.
 */
describe("landing entrance animations", () => {
  beforeEach(() => localStorage.clear());

  it("feature tiles start hidden and stagger in", () => {
    renderWithClient(<FeatureStrip />);
    const tiles = screen.getAllByRole("listitem");
    expect(tiles).toHaveLength(5);
    for (const tile of tiles) expect(tile.style.opacity).toBe("0");
  });

  it("player cards start hidden, with one tab stop each", () => {
    renderWithClient(
      <PlayerGrid
        limit={12}
        loading={false}
        data={[
          { account_id: 1, personaname: "One", avatarfull: null, last_match_time: null },
          { account_id: 2, personaname: "Two", avatarfull: null, last_match_time: null },
        ]}
      />,
    );
    const links = screen.getAllByRole("link");
    for (const link of links) {
      const block = link.parentElement!;
      expect(block.style.opacity).toBe("0");
      expect(block).not.toHaveAttribute("tabindex");
    }
  });

  it("recently viewed chips start hidden and stagger in", () => {
    localStorage.setItem(
      VIEWED_PLAYERS_KEY,
      JSON.stringify([
        { account_id: 1, personaname: "A", avatarfull: null },
        { account_id: 2, personaname: "B", avatarfull: null },
      ]),
    );
    renderWithClient(<RecentlyViewed />);
    const chips = screen.getAllByRole("listitem");
    expect(chips).toHaveLength(2);
    for (const chip of chips) expect(chip.style.opacity).toBe("0");
  });
});
