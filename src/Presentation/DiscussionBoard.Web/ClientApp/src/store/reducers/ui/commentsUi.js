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

  CREATE_COMMENTVOTE_START,
  CREATE_COMMENTVOTE_SUCCESS,
  CREATE_COMMENTVOTE_FAILURE,

  UPDATE_COMMENTVOTE_START,
  UPDATE_COMMENTVOTE_SUCCESS,
  UPDATE_COMMENTVOTE_FAILURE,

  DELETE_COMMENTVOTE_START,
  DELETE_COMMENTVOTE_SUCCESS,
  DELETE_COMMENTVOTE_FAILURE
} from '../../actions/actionTypes';

const initialState = {
  commentsLoading: false,

  createCommentLoading: false,
  createCommentError: null,

  updateCommentLoading: false,
  updateCommentError: null,
  updateCommentId: null,
  
  deleteCommentLoading: false,
  deleteCommentId: null,

  commentVoteLoading: false,
  commentVoteId: null
};

const commentsUi = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS_START: 
      return { 
        ...state,
        commentsLoading: true,
      };

    case REQUEST_COMMENTS_SUCCESS: 
      return { 
        ...state,
        commentsLoading: false,
      };

    case REQUEST_COMMENTS_FAILURE:
      return {
        ...state, 
        commentsLoading: false,
      };

    case CREATE_COMMENT_START:
      return { 
        ...state,
        createCommentLoading: true,
        createCommentError: null
      };

    case CREATE_COMMENT_SUCCESS:
      return { 
        ...state,
        createCommentLoading: false,
        createCommentError: null
      };

    case CREATE_COMMENT_FAILURE:
      return { 
        ...state,
        createCommentLoading: false,
        createCommentError: action.error
      };

    case UPDATE_COMMENT_START:
      return { 
        ...state,
        updateCommentId: action.commentId,
        updateCommentLoading: true,
        updateCommentError: null
      };

    case UPDATE_COMMENT_SUCCESS:
      return { 
        ...state,
        updateCommentId: null,
        updateCommentLoading: false,
        updateCommentError: null
      };
      
    case UPDATE_COMMENT_FAILURE:
      return { 
        ...state,
        updateCommentId: null,
        updateCommentLoading: false,
        updateCommentError: action.error
      };

    case DELETE_COMMENT_START:
      return { 
        ...state,
        deleteCommentId: action.commentId,
        deleteCommentLoading: true
      };

    case DELETE_COMMENT_SUCCESS:
      return { 
        ...state,
        deleteCommentId: null,
        deleteCommentLoading: false
      };

    case DELETE_COMMENT_FAILURE:
      return { 
        ...state,
        deleteCommentId: null,
        deleteCommentLoading: false
      };

    case CREATE_COMMENTVOTE_START:
    case UPDATE_COMMENTVOTE_START:
    case DELETE_COMMENTVOTE_START:
      return { 
        ...state,
        commentVoteLoading: true,
        commentVoteId: action.commentVoteId 
      };
    
    case CREATE_COMMENTVOTE_SUCCESS:
    case UPDATE_COMMENTVOTE_SUCCESS:
    case DELETE_COMMENTVOTE_SUCCESS:
      return { 
        ...state,
        commentVoteId: null,
        commentVoteLoading: false,
      };

    case CREATE_COMMENTVOTE_FAILURE:
    case UPDATE_COMMENTVOTE_FAILURE:
    case DELETE_COMMENTVOTE_FAILURE:
      return { 
        ...state,
        commentVoteId: null,
        commentVoteLoading: false
      };

    default:
      return state;
  }
};

export default commentsUi;