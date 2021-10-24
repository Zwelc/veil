import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const muiTheme = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

export const storyDecorator = muiTheme;
