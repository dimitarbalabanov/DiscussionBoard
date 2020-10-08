import {
  FETCH_FORUM_START,
  FETCH_FORUM_SUCCESS,
  FETCH_FORUM_FAIL
} from '../actions/actionTypes';

const initialForumState = {
  forum: null,
  forumLoading: false,
  forumError: null
};

const initialState = {
  ...initialForumState
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



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORUM_START: return fetchForumByIdStart( state, action );
        case FETCH_FORUM_SUCCESS: return fetchForumByIdSuccess( state, action );
        case FETCH_FORUM_FAIL: return fetchForumByIdFail( state, action );
        default: return state;
    }
};

export default reducer;