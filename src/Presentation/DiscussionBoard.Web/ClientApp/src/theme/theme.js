import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';

const theme = createMuiTheme({
  status: {
    danger: colors.blueGrey[700],
    success: colors.blueGrey[700]
  },
  palette: {
    action: {
      disabledBackground: colors.blue[300],
      disabled: colors.blueGrey[700],
      active: colors.red[500],
      hover: colors.orange[500],
      selected: colors.orange[500],
      activatedOpacity: colors.orange[500],
    },
    success : {
      main:  colors.blue[300]
    },

    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.common.black
       //main: colors.blue[700]
      //main: colors.blueGrey[900]
      //main: '#0079D3'
    },
    secondary: {
      //main: colors.grey[900]
      // main: colors.deepOrange[500]
       main: colors.blue[700]

    },
    text: {
      primary: colors.blueGrey[700],
      secondary: colors.blueGrey[600]
    },
  },
  typography,
  // typography: {
  //   fontFamily: [
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(','),
  //   fontSize: 12
  // },
});

export default theme;
