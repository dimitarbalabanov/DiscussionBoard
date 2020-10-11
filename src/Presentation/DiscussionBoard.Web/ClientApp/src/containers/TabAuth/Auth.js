import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth, register } from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import TabPanel from './components/TabPanel/TabPanel';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

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

const Auth = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const { 
    authLoading,
    registerLoading,
    isAuthenticated,
    onAuth,
    onRegister
   } = props;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Page title="Authentication">
     <Box display="flex" flexDirection="column" height="100%" justifyContent="center"className={classes.mainGrid}>
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Paper square>
              <Tabs centered value={value} onChange={(event, newValue) => setValue(newValue)}>
                <Tab label="Sign in" index={0} />
                <Tab label="Sign up" index={1} />
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
            {authLoading ? <Spinner /> : <LoginForm onAuth={onAuth}/>}
            </TabPanel>
            <TabPanel value={value} index={1}>
            {registerLoading ? <Spinner /> : <RegisterForm onRegister={onRegister}/>}
            </TabPanel>
          </div>
        </Container> 
      </Box>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    authLoading: state.auth.loading,
    authError: state.auth.error,
    registerLoading: state.register.loading,
    registerError: state.register.error,
    isAuthenticated: state.auth.token !== null
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
)(Auth);