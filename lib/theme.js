import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
		mode: 'dark',
    type: 'dark',
    primary: {
      main: '#16161a',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#adbac7',
    },
    background: {
      default: '#242629',
    },
  },
  typography: {
    fontFamily: 'Nunito',
  },
});

export default theme;