import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_RESET,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,
  CREATE_VOTE_START,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAIL,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET
} from '../actions/actionTypes';

const initialPostState = {
  post: null,
  postLoading: false,
  postError: null
};

const initialUpdatePostState = {
  updatePostLoading: false,
  updatePostError: null,
  updatePostSuccess: false
};

const initialDeletePostState = {
  deletePostLoading: false,
  deletePostError: null,
  deletePostSuccess: false
};

const initialCreateCommentState = {
  createCommentLoading: false,
  createCommentError: null,
  createCommentSuccess: false
};

const initialDeleteCommentState = {
  deleteCommentLoading: false,
  deleteCommentError: null,
  deleteCommentSuccess: false
};

const initialCreateVoteState = {
  newVoteId: null,
  newVoteLoading: false,
  newVoteError: null,
  newCommentScore: null
};

const initialState = {
  ...initialPostState,
  ...initialUpdatePostState,
  ...initialDeletePostState,
  ...initialCreateCommentState,
  ...initialDeleteCommentState,
  ...initialCreateVoteState
};

const fetchPostByIdStart = (state, action) => {
  return { 
    ...state,
    postLoading: true,
    postError: null
  };
};

const fetchPostByIdSuccess = (state, action) => {
  return { 
    ...state,
    post: action.post,
    postLoading: false,
    postError: null
  };
};

const fetchPostByIdFail = (state, action) => {
  return {
    ...state, 
    postLoading: false,
    postError: action.error
  };
};

const updatePostStart = (state, action) => {
  return { 
    ...state,
    updatePostSuccess: false,
    updatePostError: null,
    updatePostLoading: true
  };
};

const updatePostSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      title: action.updatedData.title,
      content: action.updatedData.content
    },
    updatePostSuccess: true,
    updatePostLoading: false,
    updatePostError: null
  };
};

const updatePostFail = (state, action) => {
  return {
    ...state, 
    updatePostSuccess: false,
    updatePostLoading: false,
    updatePostError: action.error
  };
};

const updatePostReset = (state, action) => {
  return {
    ...state, 
    ...initialUpdatePostState
  };
};

const deletePostStart = (state, action) => {
  return { 
    ...state,
    deletePostSuccess: false,
    deletePostError: null,
    deletePostLoading: true
  };
};

const deletePostSuccess = (state, action) => {
  return { 
    ...state,
    deletePostSuccess: true,
    deletePostLoading: false,
    deletePostError: null
  };
};

const deletePostFail = (state, action) => {
  return {
    ...state, 
    deletePostSuccess: false,
    deletePostLoading: false,
    deletePostError: action.error
  };
};

const deletePostReset = (state, action) => {
  return {
    ...state, 
    ...initialDeletePostState
  };
};

const createCommentStart = (state, action) => {
  return { 
    ...state,
    createCommentSuccess: false,
    createCommentLoading: true,
    createCommentError: null
  };
};

const createCommentSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: [...state.post.comments, action.newComment]
    },
    createCommentSuccess: true,
    createCommentLoading: false,
    createCommentError: null
  };
};

const createCommentFail = (state, action) => {
  return { 
    ...state,
    createCommentSuccess: false,
    createCommentLoading: false,
    createCommentError: action.newCommentError
  };
};

const createCommentReset = (state, action) => {
  return { 
    ...state,
    ...initialCreateCommentState
  };
};

const deleteCommentStart = (state, action) => {
  return { 
    ...state,
    deleteCommentError: null,
    deleteCommentLoading: true,
    deleteCommentSuccess: false
  };
};

const deleteCommentSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.filter(c => c.id !== action.commentId)
    },
    deleteCommentLoading: false,
    deleteCommentError: null,
    deleteCommentSuccess: true
  };
};

const deleteCommentFail = (state, action) => {
  return { 
    ...state,
    deleteCommentError: action.deleteCommentError,
    deleteCommentLoading: false,
    deleteCommentSuccess: false
  };
};

const deleteCommentReset = (state, action) => {
  return { 
    ...state,
    deleteCommentError: null,
    deleteCommentLoading: false,
    deleteCommentSuccess: false
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
        case CREATE_COMMENT_RESET: return createCommentReset(state, action);
        case DELETE_COMMENT_START: return deleteCommentStart(state, action);
        case DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
        case DELETE_COMMENT_FAIL: return deleteCommentFail(state, action);
        case DELETE_COMMENT_RESET: return deleteCommentReset(state, action);
        case CREATE_VOTE_START: return createVoteStart(state, action);
        case CREATE_VOTE_SUCCESS: return createVoteSuccess(state, action);
        case CREATE_VOTE_FAIL: return createVoteFail(state, action);
        case DELETE_POST_START: return deletePostStart(state, action);
        case DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case DELETE_POST_FAIL: return deletePostFail(state, action);
        case DELETE_POST_RESET: return deletePostReset(state, action);
        case UPDATE_POST_START: return updatePostStart(state, action);
        case UPDATE_POST_SUCCESS: return updatePostSuccess(state, action);
        case UPDATE_POST_FAIL: return updatePostFail(state, action);
        case UPDATE_POST_RESET: return updatePostReset(state, action);
        default: return state;
    }
};

export default reducer;