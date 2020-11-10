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
import Modal from './components/GlobalModal/GlobalModal';

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
    modalType,
    modalTitle,
    modalMessage,
    onCloseModal
  } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      <Modal show={showModal} type={modalType} title={modalTitle} message={modalMessage} handleClose={onCloseModal} />
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
    showModal: state.modal.show,
    modalType: state.modal.type,
    modalTitle: state.modal.title,
    modalMessage: state.modal.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onCloseSnackbar: () => dispatch(actions.hideSnackbar()),
    onCloseModal: () => dispatch(actions.hideModal()),
  };
};

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
