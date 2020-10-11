import {
  FETCH_POST_START,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_RESET,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_RESET,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_RESET,
  CREATE_VOTE_START,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,
  UPDATE_VOTE_START,
  UPDATE_VOTE_SUCCESS,
  UPDATE_VOTE_FAILURE,
  DELETE_VOTE_START,
  DELETE_VOTE_SUCCESS,
  DELETE_VOTE_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_RESET,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_RESET
} from '../actions/actionTypes';

const initialPostState = {
  post: null,
  postLoading: false,
  postError: null
};

const initialCreatePostState = {
  createPostSuccess: false,
  createPostLoading: false,
  createPostError: null,
  newPostId: null
}

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
  createVoteId: null,
  createVoteLoading: false,
  createVoteError: null,
  createVoteCommentScore: null
};

const initialUpdateVoteState = {
  updateVoteId: null,
  updateVoteLoading: false,
  updateVoteError: null,
  updateVoteCommentScore: null
};

const initialDeleteVoteState = {
  deleteVoteId: null,
  deleteVoteLoading: false,
  deleteVoteError: null,
  deleteVoteCommentScore: null
};

const initialState = {
  ...initialPostState,
  ...initialCreatePostState,
  ...initialUpdatePostState,
  ...initialDeletePostState,
  ...initialCreateCommentState,
  ...initialDeleteCommentState,
  ...initialCreateVoteState,
  ...initialUpdateVoteState,
  ...initialDeleteVoteState
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
    post: action.data,
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
    createVoteError: null,
    createVoteLoading: true 
  };
};

const createVoteSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore})
    },  
    createVoteLoading: false,
    createVoteError: null
  };
};

const createVoteFail = (state, action) => {
  return { 
    ...state,
    createVoteError: action.createVoteError,
    createVoteLoading: false
  };
};

const updateVoteStart = (state, action) => {
  return { 
    ...state,
    updateVoteError: null,
    updateVoteLoading: true 
  };
};

const updateVoteSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore})
    },  
    updateVoteLoading: false,
    updateVoteError: null
  };
};

const updateVoteFail = (state, action) => {
  return { 
    ...state,
    updateVoteError: action.updateVoteError,
    updateVoteLoading: false
  };
};

const deleteVoteStart = (state, action) => {
  return { 
    ...state,
    deleteVoteError: null,
    deleteVoteLoading: true 
  };
};

const deleteVoteSuccess = (state, action) => {
  return { 
    ...state,
    post: {
      ...state.post,
      comments: state.post.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore})
    },  
    deleteVoteLoading: false,
    deleteVoteError: null
  };
};

const deleteVoteFail = (state, action) => {
  return { 
    ...state,
    deleteVoteError: action.deleteVoteError,
    deleteVoteLoading: false
  };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_START: return fetchPostByIdStart(state, action);
        case FETCH_POST_SUCCESS: return fetchPostByIdSuccess(state, action);
        case FETCH_POST_FAILURE: return fetchPostByIdFail(state, action);

        case CREATE_POST_START: return createPostStart(state, action);
        case CREATE_POST_SUCCESS: return createPostSuccess(state, action);
        case CREATE_POST_FAILURE: return createPostFail(state, action);
        case CREATE_POST_RESET: return createPostReset(state, action);
        case UPDATE_POST_START: return updatePostStart(state, action);
        case UPDATE_POST_SUCCESS: return updatePostSuccess(state, action);
        case UPDATE_POST_FAILURE: return updatePostFail(state, action);
        case UPDATE_POST_RESET: return updatePostReset(state, action);
        case DELETE_POST_START: return deletePostStart(state, action);
        case DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case DELETE_POST_FAILURE: return deletePostFail(state, action);
        case DELETE_POST_RESET: return deletePostReset(state, action);

        case CREATE_COMMENT_START: return createCommentStart(state, action);
        case CREATE_COMMENT_SUCCESS: return createCommentSuccess(state, action);
        case CREATE_COMMENT_FAILURE: return createCommentFail(state, action);
        case CREATE_COMMENT_RESET: return createCommentReset(state, action);
        case DELETE_COMMENT_START: return deleteCommentStart(state, action);
        case DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
        case DELETE_COMMENT_FAILURE: return deleteCommentFail(state, action);
        case DELETE_COMMENT_RESET: return deleteCommentReset(state, action);

        case CREATE_VOTE_START: return createVoteStart(state, action);
        case CREATE_VOTE_SUCCESS: return createVoteSuccess(state, action);
        case CREATE_VOTE_FAILURE: return createVoteFail(state, action);
        case UPDATE_VOTE_START: return updateVoteStart(state, action);
        case UPDATE_VOTE_SUCCESS: return updateVoteSuccess(state, action);
        case UPDATE_VOTE_FAILURE: return updateVoteFail(state, action);
        case DELETE_VOTE_START: return deleteVoteStart(state, action);
        case DELETE_VOTE_SUCCESS: return deleteVoteSuccess(state, action);
        case DELETE_VOTE_FAILURE: return deleteVoteFail(state, action);
        default: return state;
    }
};

export default reducer;