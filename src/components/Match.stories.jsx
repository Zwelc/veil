import React from "react";
import Heroes from "dotaconstants/build/heroes.json";
import Match from "./Match";

export default {
  title: "Player/Match",
  component: Match,
};

const Template = (args) => <Match {...args} />;

export const Default = Template.bind({});
Default.args = {
  match: {
    match_id: 6237614985,
    player_slot: 0,
    radiant_win: false,
    duration: 2722,
    game_mode: 22,
    lobby_type: 0,
    hero_id: 107,
    start_time: 1635013976,
    version: 21,
    kills: 4,
    deaths: 12,
    assists: 26,
    skill: null,
    xp_per_min: 606,
    gold_per_min: 361,
    hero_damage: 24127,
    tower_damage: 184,
    hero_healing: 144,
    last_hits: 88,
    lane: 3,
    lane_role: 3,
    is_roaming: false,
    cluster: 214,
    leaver_status: 0,
    party_size: 5,
  },
  heroes: Heroes,
};
