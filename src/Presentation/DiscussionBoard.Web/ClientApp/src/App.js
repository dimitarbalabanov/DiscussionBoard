import React, { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import theme from './theme/theme';
import Routes from './Routes';
import Layout from './layout/Layout';
import Snackbar from './components/Snackbar/Snackbar';

const App = props => {
  // const {
  //   isAuthenticated,
  //   username,
  //   onTryAutoSignup
  // } = props;

  // useEffect(() => {
  //   onTryAutoSignup();
  // }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Router>
          <Layout isAuth={false} username={'ei sa'}>
            <Routes/>
          </Layout>
        </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    // isAuthenticated: state.auth.token !== null,
    // username: state.auth.username
    showSnackbar: state.snackbar.show,
    snackbarType: state.snackbar.type,
    snackbarMessage: state.snackbar.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
