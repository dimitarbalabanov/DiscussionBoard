import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null
};

const registerStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true 
  };
};

const registerSuccess = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: false 
  };
};

const registerFail = (state, action) => {
  return { 
    ...state,
    error: action.error,
      loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
      case REGISTER_START: return registerStart(state, action);
      case REGISTER_SUCCESS: return registerSuccess(state, action);
      case REGISTER_FAIL: return registerFail(state, action);
      default:
          return state;
  }
};

export default reducer;