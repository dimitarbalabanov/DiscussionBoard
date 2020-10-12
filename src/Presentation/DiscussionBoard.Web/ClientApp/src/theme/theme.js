import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.black,
      paper: colors.common.white
    },
    primary: {
      main: colors.red[500]
      //main: '#0079D3'
    },
    secondary: {
      main: colors.red[300]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    },
  },
  typography
});

export default theme;
