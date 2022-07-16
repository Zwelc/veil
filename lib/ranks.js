const ranks = [
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];
function getRank(tier) {
  const text = tier.toString();
  const index = text.slice(0, 1);
  const rank = ranks[index - 1];

  return rank + " " + text.slice(1);
}

export { getRank };
