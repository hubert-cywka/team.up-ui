import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5a00bc',
      light: '#c637ff',
      dark: '#420087'
    },
    secondary: {
      main: '#74c69d',
      light: '#95d5b2',
      dark: '#40916c'
    },
    text: {
      primary: '#222',
      secondary: '#fff'
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#ff9e00'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});
