import React, { useEffect } from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
//import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme/theme';
import Routes from './Routes';
import Main from './layouts/Main/Main';

const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <BrowserRouter>
            <Main isAuth={props.isAuthenticated} username={props.username}>
              <Routes />
            </Main>
          </BrowserRouter>
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
