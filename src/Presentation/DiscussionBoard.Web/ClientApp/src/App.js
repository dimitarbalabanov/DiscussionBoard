import React, { useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import theme from './theme/theme';
import Routes from './Routes';
import Layout from './layout/Layout';
import Snackbar from './components/GlobalSnackbar/GlobalSnackbar';
import DeleteModal from './components/DeleteModal/DeleteModal';

const App = props => {
  const {
    isAuthenticated,
    username,
    onTryAutoSignup,
    showSnackbar,
    snackbarType,
    snackbarMessage,
    onCloseSnackbar,
    showModal,
    onCloseModal
  } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <Snackbar 
        show={showSnackbar} 
        type={snackbarType} 
        message={snackbarMessage}
        handleClose={onCloseSnackbar}/>
        {isAuthenticated ? 
          <DeleteModal show={showModal} handleClose={onCloseModal} />
        : null}
      <Router>
        <Layout 
          isAuth={isAuthenticated} 
          username={username}
        >
          <Routes isAuth={isAuthenticated}/>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
    showSnackbar: state.ui.snackbar.show,
    snackbarType: state.ui.snackbar.type,
    snackbarMessage: state.ui.snackbar.message,
    showModal: state.ui.modal.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onCloseSnackbar: () => dispatch(actions.hideSnackbar()),
    onCloseModal: () => dispatch(actions.hideModal())
  };
};

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
