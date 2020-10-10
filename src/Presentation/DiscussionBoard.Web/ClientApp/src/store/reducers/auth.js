import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT
} from '../actions/actionTypes';

const initialState = {
  token: null,
  username: null,
  expiresAt: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true 
  };
};

const authSuccess = (state, action) => {
  return {
    ...state, 
    token: action.token,
    username: action.username,
    expiresAt: action.expiresAt,
    error: null,
    loading: false
    };
};

const authFail = (state, action) => {
  return {
    ...state, 
    error: action.error,
    loading: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    username: null,
    expiresAt: null 
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_START: return authStart(state, action);
      case AUTH_SUCCESS: return authSuccess(state, action);
      case AUTH_FAILURE: return authFail(state, action);
      case AUTH_LOGOUT: return authLogout(state, action);
      default: return state;
    }
};

export default reducer;