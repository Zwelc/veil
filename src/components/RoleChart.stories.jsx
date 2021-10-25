import React from "react";

import RoleChart from "./RoleChart";

export default {
  title: "Player/Roles",
  component: RoleChart,
};
const Template = (args) => <RoleChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      name: "Unknown",
      games: 3451,
      win: 1870,
    },
    {
      name: "Safelane",
      games: 507,
      win: 272,
    },
    {
      name: "Midlane",
      games: 767,
      win: 407,
    },
    {
      name: "Offlane",
      games: 524,
      win: 251,
    },
    {
      name: "Jungle",
      games: 116,
      win: 59,
    },
  ],
};
