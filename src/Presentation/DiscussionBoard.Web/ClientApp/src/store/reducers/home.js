import {
  FETCH_FORUMS_START,
  FETCH_FORUMS_SUCCESS,
  FETCH_FORUMS_FAIL
} from '../actions/actionTypes';

const initialState = {
  forums: [],
  loading: false,
  error: null
};

const fetchForumsStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true
  };
};

const fetchForumsSuccess = (state, action) => {
  return { 
    ...state,
    forums: action.forums,
    loading: false,
    error: null
  };
};

const fetchForumsFail = (state, action) => {
  return { 
    ...state,
    error: action.error,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORUMS_START: return fetchForumsStart(state, action);
        case FETCH_FORUMS_SUCCESS: return fetchForumsSuccess(state, action);
        case FETCH_FORUMS_FAIL: return fetchForumsFail(state, action);
        default: return state;
    }
};

export default reducer;