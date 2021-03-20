import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './actionTypes';
import {
  getUsername,
  getToken,
  getExpiresAt,
  setAuthorization,
  removeAuthorization
} from '../../utils/authStorage';
import { 
  login as loginApi,
  register as registerApi
} from "../../api/identityService";
import { 
  showSnackbar
} from "./snackbar";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, username, expiresAt) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    username: username,
    expiresAt: expiresAt
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAILURE,
    error: error
  };
};

export const logout = () => {
  removeAuthorization();
  return {
      type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expiresAt) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, (new Date(expiresAt).getTime() - new Date().getTime()));
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };

    loginApi(authData)
      .then(response => {
        const {
          username,
          token,
          expiresAt
        } = response.data;
        setAuthorization(username, token, expiresAt);
        dispatch(authSuccess(token, username, expiresAt));
        dispatch(showSnackbar("info", `Logged in as ${username}`));
        dispatch(checkAuthTimeout(expiresAt));
      })
      .catch(error => {
        dispatch(authFail(error.message));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = getToken();
    if (!token) {
      dispatch(logout());
    } else {
      const expiresAt = new Date(getExpiresAt());
      if (expiresAt <= new Date()) {
        dispatch(logout());
      } else {
        const username = getUsername();
        dispatch(authSuccess(token, username, expiresAt));
        dispatch(checkAuthTimeout(expiresAt));
      }   
    }
  };
};

export const register = (email, password, confirmPassword, username) => {
  return {
    types: [
      REGISTER_START,
      REGISTER_SUCCESS,
      REGISTER_FAILURE
    ],
    callApi: () => registerApi({email, password, confirmPassword, username}),
    effect({ dispatch, state, type}) {
      if (type === REGISTER_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully registered. Go sign in.'));
        dispatch(auth(email, password));
      }
      if (type === REGISTER_FAILURE) {
        dispatch(showSnackbar('error', "Error registering."))
      }
    }
  }
};