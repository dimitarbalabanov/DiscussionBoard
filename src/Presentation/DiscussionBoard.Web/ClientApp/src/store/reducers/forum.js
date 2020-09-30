import {
  FETCH_FORUM_START,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAIL,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
} from '../actions/actionTypes';

const initialForumState = {
  forum: null,
  forumLoading: false,
  forumError: null
};

const initialCreatePostState = {
  createPostSuccess: false,
  createPostLoading: false,
  createPostError: null,
  newPostId: null
}

const initialState = {
  ...initialForumState,
  ...initialCreatePostState
};

const fetchForumByIdStart = (state, action) => {
  return { 
    ...state,
    forumLoading: true,
    forumError: null
  };
};

const fetchForumByIdSuccess = (state, action) => {
  return {
    ...state, 
    forum: action.forum,
    forumLoading: false,
    forumError: null
  };
};

const fetchForumByIdFail = (state, action) => {
  return  {
    ...state,
    forumLoading: false,
    forumError: action.error 
  };
};

const createPostStart = (state, action) => {
  return {
    ...state,
    createPostSuccess: false,
    createPostLoading: true,
    createPostError: null
  };
};

const createPostSuccess = (state, action) => {
  return {
    ...state,
    forum: {
      ...state.forum,
      posts: [action.newPost, ...state.forum.posts]
    },
    newPostId: action.newPost.id,
    createPostSuccess: true,
    createPostLoading: false,
    createPostError: null
  };
};

const createPostFail = (state, action) => {
  return {
    ...state,
    createPostError: action.error,
    createPostLoading: false,
    createPostSuccess: false
  };
};

const createPostReset = (state, action) => {
  return {
    ...state,
    ...initialCreatePostState
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
        case CREATE_POST_RESET: return createPostReset(state, action);
        default: return state;
    }
};

export default reducer;