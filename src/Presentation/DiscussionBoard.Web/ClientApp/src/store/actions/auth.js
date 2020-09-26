import { loginApi } from "../../api/identityService";
import {
  getUsername,
  getToken,
  getExpiresAt,
  setAuthorization,
  removeAuthorization
} from '../../utils/authStorage';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, username, expiresAt) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
    expiresAt: expiresAt
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  removeAuthorization();
  return {
      type: actionTypes.AUTH_LOGOUT
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
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout(expiresAt));
      }   
    }
  };
};