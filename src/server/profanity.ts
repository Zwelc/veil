import "server-only";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
import BadWordsNext from "bad-words-next";
import ch from "bad-words-next/lib/ch";
import de from "bad-words-next/lib/de";
import es from "bad-words-next/lib/es";
import fr from "bad-words-next/lib/fr";
import pl from "bad-words-next/lib/pl";
import ru from "bad-words-next/lib/ru";
import ruLat from "bad-words-next/lib/ru_lat";
import ua from "bad-words-next/lib/ua";

// Both filters are built once per server instance. Building is expensive, so never do it per call.

// English: obscenity, which handles leetspeak and lookalike characters well.
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});
const censor = new TextCensor();

// Other languages: bad-words-next dictionaries. Its wildcard patterns (e.g. "*ебал*")
// catch inflected and prefixed Russian/Ukrainian forms that exact word lists miss.
// English is left to obscenity above.
//
// Those same substring patterns also hit ordinary words, so innocent ones are excluded.
// Found by scanning every OpenDota pro name (2026-11-10) plus a list of common words.
// bad-words-next treats exclusions as raw regex fragments, tested per word.

/** Ordinary Russian stems that contain a flagged root ("еб", "ебат", ...). */
const INNOCENT_STEMS = [
  "потреб", // consumer, consume
  "колеб", // oscillate, hesitate
  "себаст", // Sebastian
  "скреб", // scrape
  "дебат", // debate
  "дебет", // debit
  "хребет", // ridge, spine
  "xyn", // Latin "Xyne…" read as Cyrillic lookalikes
  "sexy", // fine in English (obscenity agrees); only the Russian-Latin list flags it
];

/**
 * Exact handles wrongly flagged because the library's \b treats a Latin→Cyrillic
 * lookalike switch inside a word as a word boundary.
 */
const ALLOWED_WORDS = ["wa1lse6"];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const multilingual = new BadWordsNext({
  placeholder: "*",
  placeholderMode: "repeat",
  maxCacheSize: 1000, // names repeat across pro lists, peers and search
  exclusions: [
    ...INNOCENT_STEMS.map((stem) => `\\S*${escape(stem)}\\S*`),
    ...ALLOWED_WORDS.map(escape),
  ],
});
for (const dictionary of [ru, ruLat, ua, pl, es, fr, de, ch]) {
  multilingual.add(dictionary);
}

/**
 * Note: bad-words-next's check() applies exclusions to its whole input, so one
 * excluded word would clear a whole multi-word name. filter() checks word by word.
 */
export function hasProfanity(text: string) {
  return matcher.hasMatch(text) || multilingual.filter(text) !== text;
}

/** Censors profanity in a single display string (never run this on URLs or IDs). */
export function censorText<T extends string | null | undefined>(text: T): T {
  if (!text) return text;
  const english = censor.applyTo(text, matcher.getAllMatches(text));
  return multilingual.filter(english) as T;
}
