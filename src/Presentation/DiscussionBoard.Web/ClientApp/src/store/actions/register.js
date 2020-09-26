import * as actionTypes from './actionTypes';
import { auth } from './auth'
import { registerApi } from '../../api/identityService';

export const registerStart = () => {
  return {
      type: actionTypes.REGISTER_START
  };
};

export const registerSuccess = () => {
  return {
      type: actionTypes.REGISTER_SUCCESS
  };
};

export const registerFail = (error) => {
  return {
      type: actionTypes.REGISTER_FAIL,
      error: error
  };
};

export const register = (email, password, confirmPassword, username) => {
  return dispatch => {
    dispatch(registerStart());
    const registerData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      username: username
    };

    registerApi(registerData)
      .then(res => {
       dispatch(registerSuccess());
       dispatch(auth(email, password));
      })
      .catch(error => {
          dispatch(registerFail(error.response.data.errors))
        });
  }
}