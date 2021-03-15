import { colors } from '@material-ui/core';

export default {
  action: {
    disabledBackground: colors.blue[300],
    disabled: colors.blueGrey[700],
    active: colors.blue[500],
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
    // main: colors.common.black
      // main: '#FF4500'
      //main: colors.blue[500]
      main: colors.grey[500]
   // main: '#0079D3'
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
};
