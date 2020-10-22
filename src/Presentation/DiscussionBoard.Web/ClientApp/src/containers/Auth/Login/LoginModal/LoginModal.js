import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../../../store/actions';
import { Redirect } from 'react-router-dom';
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
    // color: colors.blueGrey[800],
    // padding: '10px 8px',
    // justifyContent: 'flex-start',
    // textTransform: 'none',
    // letterSpacing: 0,
    // width: '100%',
    // fontWeight: theme.typography.fontWeightMedium
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

const LoginModal = props => {
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

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

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
            {authLoading ? <Spinner /> : <LoginForm onAuth={onAuth}/>}
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loginLoading: state.auth.loading,
    loginError: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);

