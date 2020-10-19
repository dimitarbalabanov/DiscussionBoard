import {
  REQUEST_COMMENTS_START,
  REQUEST_COMMENTS_SUCCESS,
  REQUEST_COMMENTS_FAILURE,

  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,

  UPDATE_COMMENT_START,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,

  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,

  CREATE_VOTE_START,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,

  UPDATE_VOTE_START,
  UPDATE_VOTE_SUCCESS,
  UPDATE_VOTE_FAILURE,

  DELETE_VOTE_START,
  DELETE_VOTE_SUCCESS,
  DELETE_VOTE_FAILURE,
} from '../actions/actionTypes';

const initialCommentsState = {
  comments: null,
  commentsLoading: false,
  commentsError: null,
};

const initialCreateCommentState = {
  createCommentLoading: false,
  createCommentError: null,
  createCommentSuccess: false
};

const initialUpdateCommentState = {
  updateCommentLoading: false,
  updateCommentError: null,
  updateCommentSuccess: false
};

const initialDeleteCommentState = {
  deleteCommentLoading: false,
  deleteCommentError: null,
  deleteCommentSuccess: false,
  deleteCommentId: null
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
  ...initialCommentsState,
  ...initialCreateCommentState,
  ...initialUpdateCommentState,
  ...initialDeleteCommentState,
  ...initialCreateVoteState,
  ...initialUpdateVoteState,
  ...initialDeleteVoteState
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS_START: 
      return { 
        ...state,
        commentsLoading: true,
        commentsError: null
      };

    case REQUEST_COMMENTS_SUCCESS: 
      return { 
        ...state,
        comments: action.data.comments,
        commentsLoading: false,
        commentsError: null
      };

    case REQUEST_COMMENTS_FAILURE:
      return {
        ...state, 
        commentsLoading: false,
        commentsError: action.error
      };

    case CREATE_COMMENT_START:
      return { 
        ...state,
        createCommentSuccess: false,
        createCommentLoading: true,
        createCommentError: null
      };

    case CREATE_COMMENT_SUCCESS:
      const comment = {
        creatorUserName : "asdf",
        createdOn : new Date(),
        content : action.content
      };

      return { 
        ...state,
        comments: [comment, ...state.comments],
        createCommentSuccess: true,
        createCommentLoading: false,
        createCommentError: null
      };

    case CREATE_COMMENT_FAILURE:
      return { 
        ...state,
        createCommentSuccess: false,
        createCommentLoading: false,
        createCommentError: action.error
      };

    case UPDATE_COMMENT_START:
      return { 
        ...state,
        updateCommentSuccess: false,
        updateCommentLoading: true,
        updateCommentError: null
      };

    case UPDATE_COMMENT_SUCCESS:
      return { 
        ...state,
        //comments: [...state.comments, action.newComment],
        updateCommentSuccess: true,
        updateCommentLoading: false,
        updateCommentError: null
      };
      
    case UPDATE_COMMENT_FAILURE:
      return { 
        ...state,
        updateCommentSuccess: false,
        updateCommentLoading: false,
        updateCommentError: action.error
      };

    case DELETE_COMMENT_START:
      return { 
        ...state,
        deleteCommentError: null,
        deleteCommentLoading: true,
        deleteCommentSuccess: false,
        deleteCommentId: action.commentId
      };

    case DELETE_COMMENT_SUCCESS:
      return { 
        ...state,
        comments: state.comments.filter(c => c.id !== action.commentId),
        deleteCommentLoading: false,
        deleteCommentError: null,
        deleteCommentSuccess: true,
        deleteCommentId: null
      };

    case DELETE_COMMENT_FAILURE:
      return { 
        ...state,
        deleteCommentError: action.error,
        deleteCommentLoading: false,
        deleteCommentSuccess: false,
        deleteCommentId: null
      };

    case CREATE_VOTE_START:
      return { 
        ...state,
        createVoteError: null,
        createVoteLoading: true 
      };
    
    case CREATE_VOTE_SUCCESS:
      return { 
        ...state,
        comments: state.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore}),
        createVoteLoading: false,
        createVoteError: null
      };

    case CREATE_VOTE_FAILURE:
      return { 
        ...state,
        createVoteError: action.error,
        createVoteLoading: false
      };

    case UPDATE_VOTE_START:
      return { 
        ...state,
        updateVoteError: null,
        updateVoteLoading: true 
      };

    case UPDATE_VOTE_SUCCESS:
      return { 
        ...state,
        comments: state.post.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore}),
        updateVoteLoading: false,
        updateVoteError: null
      };

    case UPDATE_VOTE_FAILURE:
      return { 
        ...state,
        updateVoteError: action.error,
        updateVoteLoading: false
      };

    case DELETE_VOTE_START:
      return { 
        ...state,
        deleteVoteError: null,
        deleteVoteLoading: true 
      };

    case DELETE_VOTE_SUCCESS:
      return {
        ...state,
        comments: state.comments.slice().map((comment) => comment.id !== action.commentId ? comment : {...comment, votesScore: action.newScore}),
        deleteVoteLoading: false,
        deleteVoteError: null
      };

    case DELETE_VOTE_FAILURE:
      return { 
        ...state,
        deleteVoteError: action.error,
        deleteVoteLoading: false
      };
    
    default:
      return state;
  }
};

export default reducer;