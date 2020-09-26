import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from '../actions/actionTypes';

const initialPostState = {
  post: null,
  loading: false,
  error: null
};

const initialCreateCommentState = {
  newCommentId: null,
  newCommentLoading: false,
  newCommentError: null
}

const initialState = {
  ...initialPostState,
  ...initialCreateCommentState
};

const fetchPostByIdStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true 
  };
};

const fetchPostByIdSuccess = (state, action) => {
  return { 
    ...state,
    post: action.post,
    loading: false,
    error: null
  };
};

const fetchPostByIdFail = (state, action) => {
  return {
    ...state, 
    error: action.error,
    loading: false
  };
};

const createCommentStart = (state, action) => {
  return { 
    ...state,
    newCommentError: null,
    newCommentLoading: true 
  };
};

const createCommentSuccess = (state, action) => {
  return { 
    ...state,
    newCommentId: action.newCommentId,
    newCommentLoading: false,
    newCommentError: null 
  };
};

const createCommentFail = (state, action) => {
  return { 
    ...state,
    newCommentError: action.newCommentError,
    newCommentLoading: false,
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_START: return fetchPostByIdStart(state, action);
        case FETCH_POST_SUCCESS: return fetchPostByIdSuccess(state, action);
        case FETCH_POST_FAIL: return fetchPostByIdFail(state, action);
        case CREATE_COMMENT_START: return createCommentStart(state, action);
        case CREATE_COMMENT_SUCCESS: return createCommentSuccess(state, action);
        case CREATE_COMMENT_FAIL: return createCommentFail(state, action);
        default: return state;
    }
};

export default reducer;