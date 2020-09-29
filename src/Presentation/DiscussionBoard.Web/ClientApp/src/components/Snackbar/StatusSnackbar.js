import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const StatusSnackbar = props => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const classes = useStyles();

  const {
    type,
    message,
    reset
  } = props;

  return (
      <Snackbar 
        className={classes.root}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={props.error}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
          {message}
        </MuiAlert>
      </Snackbar>
  );
}

export default StatusSnackbar;