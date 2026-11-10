import { describe, expect, it } from "vitest";
import {
  countryName,
  formatUtcTime,
  formatDate,
  formatDuration,
  isRadiant,
  summarizeMatches,
  titleCase,
  winRate,
} from "./dota";

describe("isRadiant", () => {
  it("treats slots below 128 as Radiant", () => {
    expect(isRadiant(0)).toBe(true);
    expect(isRadiant(4)).toBe(true);
    expect(isRadiant(128)).toBe(false);
    expect(isRadiant(132)).toBe(false);
  });
});

describe("winRate", () => {
  it("returns 0 for no games", () => expect(winRate(0, 0)).toBe(0));
  it("returns a percentage", () => expect(winRate(3, 4)).toBe(75));
  it("keeps precision for formatting by the caller", () =>
    expect(winRate(1, 3)).toBeCloseTo(33.333, 2));
});

describe("titleCase", () => {
  it("title-cases snake_case and spaces", () => {
    expect(titleCase("all_pick")).toBe("All Pick");
    expect(titleCase("gold per_min")).toBe("Gold Per Min");
    expect(titleCase("")).toBe("");
  });
});

describe("formatDate", () => {
  it("formats unix seconds in UTC", () => {
    expect(formatDate(1_700_000_000)).toBe("Nov 14, 2023");
  });
  it("returns a dash for missing values", () => {
    expect(formatDate(0)).toBe("—");
    expect(formatDate(Number.NaN)).toBe("—");
  });
});

describe("formatDuration", () => {
  it("omits hours under an hour", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(2405)).toBe("40:05");
  });
  it("includes hours past an hour", () => {
    expect(formatDuration(3725)).toBe("1:02:05");
  });
  it("tolerates bad input", () => {
    expect(formatDuration(-5)).toBe("0:00");
    expect(formatDuration(Number.NaN)).toBe("0:00");
  });
});

describe("summarizeMatches", () => {
  it("handles an empty list", () => {
    expect(summarizeMatches([])).toEqual({
      count: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      averageKda: "0.0 / 0.0 / 0.0",
      averageGpm: 0,
      averageXpm: 0,
    });
  });

  it("aggregates wins and averages", () => {
    const summary = summarizeMatches([
      { won: true, kills: 10, deaths: 2, assists: 5, gold_per_min: 600, xp_per_min: 700 },
      { won: false, kills: 4, deaths: 6, assists: 9, gold_per_min: 401, xp_per_min: 500 },
    ]);
    expect(summary).toMatchObject({
      count: 2,
      wins: 1,
      losses: 1,
      winRate: 50,
      averageKda: "7.0 / 4.0 / 7.0",
      averageGpm: 501,
      averageXpm: 600,
    });
  });
});

describe("formatUtcTime", () => {
  const ref = "2026-11-10T15:58:27.000Z";
  it("shows HH:MM (UTC) on the reference day and a date otherwise", () => {
    expect(formatUtcTime("2026-11-10T09:05:00Z", ref)).toBe("09:05");
    expect(formatUtcTime("2026-11-09T23:59:00Z", ref)).toBe("9 Nov");
    expect(formatUtcTime("2026-11-10T09:05:00Z")).toBe("10 Nov");
  });
  it("returns an empty string for missing or invalid input", () => {
    expect(formatUtcTime(null, ref)).toBe("");
    expect(formatUtcTime("nope", ref)).toBe("");
  });
});

describe("countryName", () => {
  it("names known codes and passes unknown ones through", () => {
    expect(countryName("SE")).toBe("Sweden");
    expect(countryName("RU")).toBe("Russia");
    expect(countryName("ZZZ")).toBe("ZZZ");
  });
});
