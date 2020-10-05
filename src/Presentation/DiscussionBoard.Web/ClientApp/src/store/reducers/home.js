import {
  FETCH_FORUMS_START,
  FETCH_FORUMS_SUCCESS,
  FETCH_FORUMS_FAIL,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL
} from '../actions/actionTypes';

const initialState = {
  forums: [],
  forumsLoading: false,
  forumsError: null,
  posts: [],
  postsLoading: false,
  postsError: null
};

const fetchForumsStart = (state, action) => {
  return { 
    ...state,
    forumsError: null,
    forumsLoading: true
  };
};

const fetchForumsSuccess = (state, action) => {
  return { 
    ...state,
    forums: action.forums,
    forumsLoading: false,
    forumsError: null
  };
};

const fetchForumsFail = (state, action) => {
  return { 
    ...state,
    forumsError: action.error,
    forumsLoading: false
  };
};

const fetchPostsStart = (state, action) => {
  return { 
    ...state,
    postsError: null,
    postsLoading: true
  };
};

const fetchPostsSuccess = (state, action) => {
  return { 
    ...state,
    posts: action.posts,
    postsLoading: false,
    postsError: null
  };
};

const fetchPostsFail = (state, action) => {
  return { 
    ...state,
    postsError: action.error,
    postsLoading: false
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORUMS_START: return fetchForumsStart(state, action);
        case FETCH_FORUMS_SUCCESS: return fetchForumsSuccess(state, action);
        case FETCH_FORUMS_FAIL: return fetchForumsFail(state, action);
        case FETCH_POSTS_START: return fetchPostsStart(state, action);
        case FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        default: return state;
    }
};

export default reducer;