import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    // action: {
    //   selected: colors.red[300],
    // },
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      //main: colors.common.black
       main: colors.blue[700]
      //main: colors.blueGrey[900]
      //main: '#0079D3'
    },
    secondary: {
      main: colors.grey[900]
      // main: colors.deepOrange[500]
    },
    text: {
      primary: colors.blueGrey[700],
      secondary: colors.blueGrey[600]
    },
  },
  typography,
});

export default theme;
