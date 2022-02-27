import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#556CD6',
    },
    secondary: {
      main: '#FBC02D',
    },
    error: {
      main: red.A400,
    },
  },
});
