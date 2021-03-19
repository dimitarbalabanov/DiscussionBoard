import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/actionTypes';

const initialState = {
  token: null,
  username: null,
  expiresAt: null,
  error: null,
  loading: false,
  registerError: null,
  registerLoading: false
};

const authStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true 
  };
};

const authSuccess = (state, action) => {
  console.log(action)
  return {
    ...state, 
    token: action.token,
    username: action.username,
    expiresAt: action.expiresAt,
    error: null,
    loading: false
  };
};

const authFailure = (state, action) => {
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

const registerStart = (state, action) => {
  return { 
    ...state,
    registerError: null,
    registerLoading: true 
  };
};

const registerSuccess = (state, action) => {
  return { 
    ...state,
    registerError: null,
    registerLoading: false 
  };
};

const registerFailure = (state, action) => {
  return { 
    ...state,
    registerError: action.error,
    registerLoading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START: return authStart(state, action);
    case AUTH_SUCCESS: return authSuccess(state, action);
    case AUTH_FAILURE: return authFailure(state, action);
    case AUTH_LOGOUT: return authLogout(state, action);
    case REGISTER_START: return registerStart(state, action);
    case REGISTER_SUCCESS: return registerSuccess(state, action);
    case REGISTER_FAILURE: return registerFailure(state, action);
    default: return state;
  }
};

export default reducer;