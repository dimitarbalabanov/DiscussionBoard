import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';
import palette from './palette';

const theme = createMuiTheme({
  status: {
    danger: colors.blueGrey[700],
    success: colors.blueGrey[700]
  },
  palette,
  typography
});

export default theme;
