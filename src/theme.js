import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
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
  typography: {
    fontFamily: "Nunito",
  },
});
