import { deepOrange, grey} from '@mui/material/colors';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: deepOrange,
          background: {
            default: grey[100], // Page background color for light mode
            paper: '#fff3e0',  // Card background color for light mode
          },
          appBar: {
            main: deepOrange[500], // Orange color for AppBar in light mode
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          background: {
            default: '#121212', // Page background color for dark mode
            paper: '#1d1d1d',   // Card background color for dark mode
          },
          appBar: {
            main: deepOrange[900], // Darker orange color for AppBar in dark mode
          },
        }),
  },
});
