import React from 'react';
import { connect } from 'react-redux';
import { auth, register } from '../../store/actions';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TabPanel from './components/TabPanel/TabPanel';
import LoginFrom from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AuthModal = props => {
  const classes = useStyles();
  
  const {
    // loading,
    // error,
    onAuth,
    onRegister,
    isAuthenticated
  } = props;

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <div className={classes.root}>
            <Paper square>
              <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Sign in" index={0} />
                <Tab label="Sign up" index={1} />
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              <LoginFrom onAuth={onAuth}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegisterForm onRegister={onRegister} />
            </TabPanel>
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
    registerLoading: state.register.loading,
    registerError: state.register.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
    onRegister: (email, password, confirmPassword, username) => dispatch(register(email, password, confirmPassword, username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);

