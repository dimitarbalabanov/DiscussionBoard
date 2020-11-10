import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';  
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

const GlobalModal = props => {
  const classes = useStyles();
  
  const {
    show,
    type,
    title,
    message,
    handleClose
  } = props;

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent>
        <div className={classes.root}>
          <Typography>
            {type}
          </Typography>
          <Typography>
            {title}
          </Typography>
          <Typography>
            {message}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GlobalModal;

