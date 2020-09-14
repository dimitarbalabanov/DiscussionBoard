import { loginApi } from "../../api/identityService";
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
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
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
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('username', response.data.username);
              localStorage.setItem('expiresAt', response.data.expiresAt)
              dispatch(authSuccess(response.data.token, response.data.username, response.data.expiresAt));
              dispatch(checkAuthTimeout(response.data.expiresAt));
          })
          .catch(error => {
              dispatch(authFail(error.message));
          });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expiresAt = new Date(localStorage.getItem('expiresAt'));
            if (expiresAt <= new Date()) {
                dispatch(logout());
            } else {
                const username = localStorage.getItem('username');
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(expiresAt));
            }   
        }
    };
};