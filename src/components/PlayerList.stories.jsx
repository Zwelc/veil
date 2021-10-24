import React from "react";

import PlayerList from "./PlayerList";

export default {
  component: PlayerList,
  title: "Player/List",
};

const Template = (args) => <PlayerList {...args} />;

export const Default = Template.bind({});
Default.args = {
  players: [
    {
      account_id: 170365079,
      personaname: "tenko",
      avatarfull:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/17/17865e64ce18b4b71e4e8680cb33d1db5c4f838f_full.jpg",
      last_match_time: "2021-10-23T18:32:56.000Z",
      similarity: 28.3419,
    },
    {
      account_id: 319447011,
      personaname: "tenko",
      avatarfull:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/05/0542519e4e18038887042f2102ff189d27aa314b_full.jpg",
      last_match_time: "2021-09-11T14:11:04.000Z",
      similarity: 28.3419,
    },
    {
      account_id: 170309094,
      personaname: "tenko",
      avatarfull:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d9/d9411753b07053fd7b4a252aac77738227949528_full.jpg",
      last_match_time: "2021-08-24T13:53:26.000Z",
      similarity: 28.31352,
    },
    {
      account_id: 445159138,
      personaname: "tenko",
      avatarfull:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      last_match_time: "2021-08-01T10:48:54.000Z",
      similarity: 28.31352,
    },
    {
      account_id: 1003835501,
      personaname: "tenko",
      avatarfull:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/eb/eb928d904403113ecc578f2c61766a1e47485a43_full.jpg",
      last_match_time: "2019-11-01T21:33:00.000Z",
      similarity: 28.237259,
    },
  ],
};
