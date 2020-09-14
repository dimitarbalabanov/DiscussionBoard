import { loginApi } from "../../api/identityService";
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
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
    //localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
              //const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              console.log(response)
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('username', response.data.username);
              //localStorage.setItem('expirationDate', expirationDate);
              //localStorage.setItem('userId', response.data.localId);
              dispatch(authSuccess(response.data.token, response.data.username));
              //dispatch(checkAuthTimeout(response.data.expiresIn));
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
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};