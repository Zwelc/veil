import { describe, expect, it } from "vitest";
import { parsePlayerId } from "./player-link";

describe("parsePlayerId", () => {
  it.each([
    ["86745912", "86745912"],
    ["  86745912  ", "86745912"],
    ["76561198047011640", "86745912"],
    ["https://www.opendota.com/players/86745912", "86745912"],
    ["opendota.com/players/86745912/matches", "86745912"],
    ["https://www.dotabuff.com/players/86745912", "86745912"],
    ["https://stratz.com/players/86745912?x=1", "86745912"],
    ["https://steamcommunity.com/profiles/76561198047011640/", "86745912"],
  ])("parses %s", (input, expected) => {
    expect(parsePlayerId(input)).toBe(expected);
  });

  it.each([
    "",
    "Miracle-",
    "0",
    "-5",
    "12.5",
    "abc123",
    "https://steamcommunity.com/id/somevanity",
    "https://example.com/players/86745912",
    "https://www.dotabuff.com/matches/123",
    "https://www.dotabuff.com/players/notanumber",
    "99999999999999999999999",
  ])("rejects %j", (input) => {
    expect(parsePlayerId(input)).toBeNull();
  });
});
