import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { veilApi } from "@/lib/api/veil";
import { VIEWED_PLAYERS_KEY } from "@/hooks/useViewedPlayers";
import { renderWithClient } from "../../../../test/utils";
import PlayerNav from "./player-nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/players/42" }));

const profile = {
  accountId: 42,
  personaname: "Viewer",
  avatar: "https://avatars.steamstatic.com/42.jpg",
  countryName: null,
  rankTier: null,
  leaderboardRank: null,
};

describe("PlayerNav", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(veilApi.players, "heroes").mockResolvedValue([]);
  });

  it("records the visit for the home page's recently viewed row", async () => {
    vi.spyOn(veilApi.players, "profile").mockResolvedValue(profile);
    renderWithClient(<PlayerNav id="42" />);
    expect(await screen.findByRole("heading", { name: "Viewer" })).toBeInTheDocument();
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(VIEWED_PLAYERS_KEY)!)).toEqual([
        { account_id: 42, personaname: "Viewer", avatarfull: profile.avatar },
      ]),
    );
  });

  it("does not record a profile without a name", async () => {
    vi.spyOn(veilApi.players, "profile").mockResolvedValue({
      ...profile,
      personaname: null,
    });
    renderWithClient(<PlayerNav id="42" />);
    expect(await screen.findByRole("heading", { name: "Player profile" })).toBeInTheDocument();
    expect(localStorage.getItem(VIEWED_PLAYERS_KEY)).toBeNull();
  });
});
