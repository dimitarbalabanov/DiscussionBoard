import React, { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import theme from './theme/theme';
import Routes from './Routes';
import Layout from './layout/Layout';

const App = props => {
  const {
    isAuthenticated,
    username,
    onTryAutoSignup
  } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
