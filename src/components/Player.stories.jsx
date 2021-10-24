import React from "react";

import Player from "./Player";

export default {
  title: "Player/Card",
  component: Player,
};
const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = {
  account_id: 170365079,
  personaname: "tenko",
  avatarfull:
    "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/17/17865e64ce18b4b71e4e8680cb33d1db5c4f838f_full.jpg",
};
