import { describe, expect, it, vi } from "vitest";

const constructed = vi.hoisted(() => ({ count: 0 }));

vi.mock("obscenity", async (importOriginal) => {
  const actual = await importOriginal<typeof import("obscenity")>();
  class CountingMatcher extends actual.RegExpMatcher {
    constructor(...args: ConstructorParameters<typeof actual.RegExpMatcher>) {
      super(...args);
      constructed.count++;
    }
  }
  return { ...actual, RegExpMatcher: CountingMatcher };
});

const { censorText, hasProfanity } = await import("./profanity");

describe("profanity", () => {
  it("builds the matcher once, however many strings are censored", () => {
    for (let i = 0; i < 50; i++) censorText(`player ${i}`);
    expect(constructed.count).toBe(1);
  });

  it("censors profane display names and passes clean ones through", () => {
    expect(censorText("Miracle-")).toBe("Miracle-");
    expect(censorText("fuck this")).not.toContain("fuck");
    expect(hasProfanity("shit")).toBe(true);
    expect(hasProfanity("gg wp")).toBe(false);
  });

  it("censors non-English profanity, including inflected Russian", () => {
    // Real pro display name that slipped past the English-only filter.
    const name = "выебал в рот ей дал в рот ей дал";
    expect.soft(hasProfanity(name), "name").toBe(true);
    expect(censorText(name)).not.toContain("выебал");
    expect(censorText(name)).toContain("в рот ей дал");
    expect.soft(hasProfanity("сука"), "сука").toBe(true);
    expect.soft(hasProfanity("pierdolec"), "pierdolec").toBe(true);
    expect.soft(hasProfanity("hijo de puta"), "puta").toBe(true);
    expect.soft(hasProfanity("xXpizdecXx"), "ru_lat").toBe(true);
  });

  it("leaves ordinary names and words alone", () => {
    const clean = [
      "Miracle-",
      "Yatoro",
      "TORONTOTOKYO",
      "Collapse",
      "Quinn",
      "Ame",
      "хлеб и небо", // contain "еб" inside ordinary words
      "Привет команда",
      "Небесный",
      "Россия",
      "Gracias amigo",
      "Merci beaucoup",
      "Danke schön",
      "Dziękuję",
      "Слава",
      "老陈",
      "小鬼",
      // Contain flagged roots; excluded (see INNOCENT_STEMS / ALLOWED_WORDS).
      "потребитель",
      "колебание",
      "Колебали",
      "Себастьян",
      "скребок",
      "дебаты",
      "дебет",
      "хребет",
      "Xynestar",
      "Xynos",
      "SexyeVodka",
      "wa1lse6",
    ];
    for (const text of clean) {
      expect.soft(hasProfanity(text), text).toBe(false);
      expect.soft(censorText(text), text).toBe(text);
    }
  });

  it("an excluded word does not clear profanity elsewhere in the name", () => {
    const name = "колебали выебал";
    expect(hasProfanity(name)).toBe(true);
    expect(censorText(name)).toBe("колебали ******");
  });

  it("returns null/empty input unchanged", () => {
    expect(censorText(null)).toBeNull();
    expect(censorText("")).toBe("");
  });
});
