import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import { themes } from "@storybook/theming";

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#16161a",
      contrastText: "#dcd5d5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#adbac7",
    },
    background: {
      default: "#242629",
      paper: "#524f4f",
    },
  },
});

const withThemeProvider = (Story, context) => {
  return (
    <EmotionThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export const decorators = [withThemeProvider];
export const parameters = {
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
