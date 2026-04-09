import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectProfanity(input: string) {
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const censor = new TextCensor();
  const matches = matcher.getAllMatches(input);

  return censor.applyTo(input, matches);
}
