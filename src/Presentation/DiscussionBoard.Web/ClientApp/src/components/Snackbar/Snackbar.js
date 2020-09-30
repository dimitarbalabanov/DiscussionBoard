import React, { useState } from 'react';
import MaterialSnackbar from '@material-ui/core/Snackbar';
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

const Snackbar = props => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const classes = useStyles();

  const {
    //show,
    type,
    message,
    reset
    //hideSnackbar
  } = props;

  return (
      <MaterialSnackbar 
        className={classes.root}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
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
}

// const mapStateToProps = state => {
//   return {
//     show: state.snackbar.show,
//     type: state.snackbar.type,
//     message: state.snackbar.message
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onHideSnackbar: () => dispatch(actions.hideSnackbar()),
//     onCreateComment: (comment) => dispatch(actions.createComment(comment)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
export default Snackbar;