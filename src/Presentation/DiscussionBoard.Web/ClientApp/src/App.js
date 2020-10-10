import React, { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import theme from './theme/theme';
import Routes from './Routes';
import Layout from './layout/Layout';
import Snackbar from './components/GlobalSnackbar/GlobalSnackbar';

const App = props => {
  const {
    isAuthenticated,
    username,
    onTryAutoSignup,
    showSnackbar,
    snackbarType,
    snackbarMessage,
    onCloseSnackbar
  } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Snackbar show={showSnackbar} type={snackbarType} message={snackbarMessage} handleClose={onCloseSnackbar}/>
        <Router>
          <Layout isAuth={isAuthenticated} username={username}>
            <Routes/>
          </Layout>
        </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
    showSnackbar: state.snackbar.show,
    snackbarType: state.snackbar.type,
    snackbarMessage: state.snackbar.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onCloseSnackbar: () => dispatch(actions.hideSnackbar())
  };
};

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
