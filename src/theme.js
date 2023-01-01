import { createTheme } from '@mui/material/styles';
import variables from './styles/abstract/_variables.scss';

const colors = {
  primary: variables.brandPrimary,
  primaryDark: variables.brandPrimary,
  error: variables.error,
  errorDarker: variables.errorDarker,
  success: variables.success,
  successDarker: variables.successDarker,
  info: variables.info,
  infoDarker: variables.infoDarker,
  warning: variables.warning,
  warningDarker: variables.warningDarker,
  primaryLight: variables.brandPrimaryLight,
  primaryContrast: '#fff',
  secondary: variables.brandSecondary,
  secondaryDark: variables.brandSecondaryDark,
  secondaryLight: variables.brandSecondaryLight,
  secondaryContrast: '#fff',
};

export { colors };

export default createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        input: {
          // padding: '5px 10px'
        },
      },
    },
    MuiPaper: {
      root: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'unset',
          // padding: '10px 40px'
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: variables.brandPrimary,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: variables.brandPrimaryDarker,
          },
        },
        label: {
          '&.Mui-selected': {
            color: '#fff',
          },
          color: '#e2e2e2',
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          'margin-top': '0px',
          'margin-bottom': '20px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '5px 10px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: variables.brandPrimary,
      light: variables.brandPrimaryLight,
      dark: variables.brandPrimaryDarkest,
      color: '#fff',
      contrastText: colors.primaryContrast,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.secondaryContrast,
    },
  },
  spacing: (factor) => [0, 4, 8, 16, 32, 64][factor],
  shadows: Array(25).fill('none'),
  typography: {
    fontFamily: 'Inter-Light',
    fontSize: 12,
    useNextVariants: true,
  },
});
