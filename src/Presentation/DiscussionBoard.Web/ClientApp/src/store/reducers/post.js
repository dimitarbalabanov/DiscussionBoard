import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_VOTE_START,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAIL
} from '../actions/actionTypes';

const initialPostState = {
  post: null,
  loading: false,
  error: null
};

const initialCreateCommentState = {
  newCommentId: null,
  newCommentLoading: false,
  newCommentError: null,
  isNewComment: false
}

const initialCreateVoteState = {
  newVoteId: null,
  newVoteLoading: false,
  newVoteError: null,
  newCommentScore: null
}

const initialState = {
  ...initialPostState,
  ...initialCreateCommentState,
  ...initialCreateVoteState
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
    newCommentLoading: true ,
    isNewComment: false
  };
};

const createCommentSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: [...state.post.comments, action.newComment]
    },
    newCommentLoading: false,
    newCommentError: null,
    isNewComment: true
  };
};

const createCommentFail = (state, action) => {
  return { 
    ...state,
    newCommentError: action.newCommentError,
    newCommentLoading: false,
    isNewComment: false
  };
};

const createVoteStart = (state, action) => {
  return { 
    ...state,
    newVoteError: null,
    newVoteLoading: true 
  };
};

const createVoteSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore})
    },  
    newVoteLoading: false,
    newVoteError: null
  };
};

const createVoteFail = (state, action) => {
  return { 
    ...state,
    newVoteError: action.newVoteError,
    newVoteLoading: false,
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
        case CREATE_VOTE_START: return createVoteStart(state, action);
        case CREATE_VOTE_SUCCESS: return createVoteSuccess(state, action);
        case CREATE_VOTE_FAIL: return createVoteFail(state, action);
        default: return state;
    }
};

export default reducer;