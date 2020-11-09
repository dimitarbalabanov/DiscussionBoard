import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';  
import DialogContent from '@material-ui/core/DialogContent';
import LoginForm from '../LoginForm/LoginForm';
import Spinner from '../../../../components/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {

  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  }
}));

const GlobalModal = props => {
  const classes = useStyles();
  
  const {
    authLoading,
    onAuth,
    isAuthenticated
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen} size="small" variant="contained" color="primary">
        <div className={classes.icon}>
          <PersonPinIcon />
        </div>
        {'Login'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div className={classes.root}>
            component
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GlobalModal;

