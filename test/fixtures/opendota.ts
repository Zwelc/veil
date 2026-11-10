/** Trimmed raw OpenDota payloads used across server tests. */

export const rawMatches = [
  {
    match_id: 101,
    player_slot: 0, // Radiant
    radiant_win: true,
    hero_id: 1, // Anti-Mage
    start_time: 1_700_000_000,
    duration: 2405,
    game_mode: 22, // All Draft
    lobby_type: 7, // Ranked
    kills: 10,
    deaths: 2,
    assists: 5,
    gold_per_min: 600,
    xp_per_min: 700,
  },
  {
    match_id: 102,
    player_slot: 130, // Dire
    radiant_win: true,
    hero_id: 2, // Axe
    start_time: 1_700_100_000,
    duration: 3725,
    game_mode: 1,
    lobby_type: 0, // Normal
    kills: 3,
    deaths: 8,
    assists: 12,
    gold_per_min: 350,
    xp_per_min: 420,
  },
  {
    match_id: 103,
    player_slot: 1,
    radiant_win: false,
    hero_id: 0, // abandoned / invalid: filtered out
    start_time: 1_700_200_000,
    duration: 100,
    game_mode: 1,
    lobby_type: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
  },
  {
    match_id: 104,
    player_slot: 128,
    radiant_win: false,
    hero_id: 9999, // unknown to dotaconstants
    start_time: 1_700_300_000,
    duration: 1800,
    game_mode: 9999,
    lobby_type: 9999,
    kills: 1,
    deaths: 1,
    assists: 1,
  },
];

export const rawHeroes = [
  {
    hero_id: "2",
    games: 40,
    win: 22,
    with_games: 10,
    with_win: 6,
    against_games: 12,
    against_win: 5,
    last_played: 1_700_000_000,
  },
  {
    hero_id: "1",
    games: 90,
    win: 50,
    with_games: 3,
    with_win: 1,
    against_games: 20,
    against_win: 9,
    last_played: 1_700_100_000,
  },
];

export const rawCounts = {
  lobby_type: { "7": { games: 30, win: 18 }, "0": { games: 5, win: 1 } },
  game_mode: { "22": { games: 35, win: 19 } },
  patch: { "60": { games: 12, win: 7 } },
};

export const rawProfile = {
  profile: {
    account_id: 123,
    personaname: "shit happens",
    avatarfull: "https://avatars.steamstatic.com/shit_full.jpg",
    loccountrycode: "US",
  },
  rank_tier: 55,
  leaderboard_rank: null,
};

export const rawProPlayers = [
  {
    account_id: 1,
    personaname: "Miracle-",
    name: "Miracle",
    avatarfull: "https://avatars.steamstatic.com/1.jpg",
    last_match_time: "2026-10-01T00:00:00.000Z",
    team_name: "Nigma",
    team_tag: " NGX ",
    country_code: "jo",
  },
  {
    account_id: 2,
    personaname: "No Avatar",
    avatarfull: null,
    last_match_time: null,
  },
];
