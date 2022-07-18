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

  return {
    rank: `/ranks/rank_icon_${index}.png`,
    tier: `/ranks/rank_star_${text.slice(1)}.png`,
    alt: rank + " " + text.slice(1),
  };
}

export { getRank };
