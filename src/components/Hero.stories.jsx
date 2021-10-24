import React from "react";
import Heroes from "dotaconstants/build/heroes.json";
import Hero from "./Hero";

export default {
  title: "Player/Hero",
  component: Hero,
};

const Template = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = {
  hero: {
    hero_id: "107",
    last_played: 1635013976,
    games: 299,
    win: 161,
    with_games: 73,
    with_win: 27,
    against_games: 103,
    against_win: 58,
  },
  heroData: Heroes,
};
