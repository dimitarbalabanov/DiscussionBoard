import React, { useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/Common/GlobalStyles';
import theme from './theme/theme';
import Routes from './Routes';
import Layout from './layout/Layout';

const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <BrowserRouter>
            <Layout isAuth={props.isAuthenticated} username={props.username}>
              <Routes/>
            </Layout>
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
