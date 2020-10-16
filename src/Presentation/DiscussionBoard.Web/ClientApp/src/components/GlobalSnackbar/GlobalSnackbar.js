import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbar = props => {
  const classes = useStyles();
  
  const {
    show,
    type,
    message,
    handleClose
  } = props;

  return (
    <MaterialSnackbar 
      className={classes.root}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={show}
      autoHideDuration={3000}
      onClose={handleClose}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </MuiAlert>
    </MaterialSnackbar>
  );
};

export default Snackbar;