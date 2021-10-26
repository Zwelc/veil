import React from "react";

import NavBar from "./NavBar";

export default {
  title: "Layout/Navbar",
  component: NavBar,
  decorators: [(story) => <div style={{ width: "1200px" }}>{story()}</div>],
};

export const Default = (args) => <NavBar {...args} />;
Default.args = {
  title: "D2Stats",
};
