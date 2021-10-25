import React from "react";

import RegionChart from "./RegionChart";

export default {
  title: "Player/Chart",
  component: RegionChart,
};
const Template = (args) => <RegionChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  //
  data: [
    {
      name: "Dire",
      games: 2645,
      win: 1338,
    },
    {
      name: "Radiant",
      games: 2720,
      win: 1521,
    },
  ],
};
