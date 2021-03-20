import {
  REQUEST_FORUM_START,
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUM_FAILURE,
  REQUEST_FORUMS_START,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_FORUMS_FAILURE
} from '../../actions/actionTypes';

const initialUiState = {
  forumLoading: false,
  forumsLoading: false
};

const forumsUi = (state = initialUiState, action) => {
  switch (action.type) {
    case REQUEST_FORUM_START: return { ...state, forumLoading: true };
    case REQUEST_FORUM_SUCCESS: return { ...state, forumLoading: false };
    case REQUEST_FORUM_FAILURE: return  { ...state, forumLoading: false };
    case REQUEST_FORUMS_START: return { ...state, forumsLoading: true };
    case REQUEST_FORUMS_SUCCESS: return {  ...state, forumsLoading: false };
    case REQUEST_FORUMS_FAILURE: return { ...state, forumsLoading: false };
    default: return state;
  }
};

export default forumsUi;