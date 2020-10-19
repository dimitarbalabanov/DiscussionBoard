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

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case AUTH_START: 
      return { 
        ...state,
        error: null,
        loading: true 
      };
      
    case AUTH_SUCCESS: 
      return {
        ...state, 
        token: action.token,
        username: action.username,
        expiresAt: action.expiresAt,
        error: null,
        loading: false
      };

    case AUTH_FAILURE: 
      return {
        ...state, 
        error: action.error,
        loading: false
      };

    case AUTH_LOGOUT: 
      return {
        ...state,
        token: null,
        username: null,
        expiresAt: null 
      };

    default: 
      return state;
  }
};

export default reducer;