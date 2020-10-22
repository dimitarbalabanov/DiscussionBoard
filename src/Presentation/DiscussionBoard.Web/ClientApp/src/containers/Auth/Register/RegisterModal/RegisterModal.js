import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../../../store/actions';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import RegisterForm from '../RegisterForm/RegisterForm';
import Spinner from '../../../../components/Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

const RegisterModal = props => {
  const classes = useStyles();
  
  const {
    registerLoading,
    onRegister,
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
          <PersonAddIcon />
        </div>
        {'Register'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div className={classes.root}>
            {registerLoading ? <Spinner /> : <RegisterForm onRegister={onRegister}/>}
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
    registerLoading: state.register.loading,
    registerError: state.register.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (email, password, confirmPassword, username) => dispatch(register(email, password, confirmPassword, username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);

