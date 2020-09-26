import {
  FETCH_FORUM_START,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAIL,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from '../actions/actionTypes';

const initialForumState = {
  forum: null,
  loading: false,
  error: null
};

const initialCreatePostState = {
  newPostId: null,
  newPostLoading: false,
  newPostError: null
}

const initialState = {
  ...initialForumState,
  ...initialCreatePostState
};

const fetchForumByIdStart = (state, action) => {
  return { 
    ...state,
    error: null,
    loading: true 
  };
};

const fetchForumByIdSuccess = (state, action) => {
  return {
    ...state, 
    forum: action.forum,
    loading: false,
    error: null
  };
};

const fetchForumByIdFail = (state, action) => {
  return  {
    ...state,
    loading: false,
    error: action.error 
  };
};

const createPostStart = (state, action) => {
  return {
    ...state,
    newPostError: null,
    newPostLoading: true 
  };
};

const createPostSuccess = (state, action) => {
  return {
    ...state,
    newPostId: action.newPostId,
    newPostLoading: false,
    newPostError: null
  };
};

const createPostFail = (state, action) => {
  return {
    ...state,
    newPostError: action.newPostError,
    newPostLoading: false
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORUM_START: return fetchForumByIdStart( state, action );
        case FETCH_FORUM_SUCCESS: return fetchForumByIdSuccess( state, action );
        case FETCH_FORUM_FAIL: return fetchForumByIdFail( state, action );
        case CREATE_POST_START: return createPostStart(state, action);
        case CREATE_POST_SUCCESS: return createPostSuccess(state, action);
        case CREATE_POST_FAIL: return createPostFail(state, action);
        default: return state;
    }
};

export default reducer;