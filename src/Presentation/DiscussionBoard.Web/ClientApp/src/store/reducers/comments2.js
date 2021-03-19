import {
  SET_COMMENTS_SORT,
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
} from '../actions/actionTypes';
import { combineReducers } from "redux"

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

const createCommentSuccess = (state, action) => {
  const { data, content, username } = action;
  const { id, createdOn } = data;
  const comment = {
    id: id,
    createdOn : createdOn,
    content : content,
    creatorUserName : username,
    votesScore: 0
  };

  return { 
    ...state,
    [id]: comment,
  };

}

const updateCommentSuccess = (state, action) => {
  const { commentId, content } = action;

  return { 
    ...state,
    [commentId] : {
      ...state[commentId],
      content: content
    }
  };
}

const deleteCommentSuccess = (state, action) => {
  const { commentId } = action;
  const newState = { ...state };
  delete newState[commentId] 

  return { 
    ...newState,
  };
}

const createCommentVoteSuccess = (state, action) => {
  console.log(action)
  const {commentId, voteType, data } = action;
  const { id } = data;

    return { 
      ...state,
      [commentId] : {
        ...state[commentId],
        voteType: voteType,
        voteId: id,
        votesScore: +state[commentId].votesScore + +voteType
      }
    };
}

const updateCommentVoteSuccess = (state, action) => {
  const {commentId, voteType } = action;

    return { 
      ...state,
      [commentId] : {
        ...state[commentId],
        voteType: voteType,
        votesScore: voteType === '1' ? +state[commentId].votesScore + 2 : +state[commentId].votesScore - 2
      }
    };
}

const deleteCommentVoteSuccess = (state, action) => {
  const {commentId, voteType } = action;

    return { 
      ...state,
      [commentId] : {
        ...state[commentId],
        voteType: null,
        voteId: null,
        votesScore: voteType === '1' ? +state[commentId].votesScore - 1 : +state[commentId].votesScore + 1,
      }
    };
}

function commentsById(state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS: return createCommentSuccess(state, action);
    case UPDATE_COMMENT_SUCCESS: return updateCommentSuccess(state, action);
    case DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
    case CREATE_COMMENTVOTE_SUCCESS: return createCommentVoteSuccess(state, action);
    case UPDATE_COMMENTVOTE_SUCCESS: return updateCommentVoteSuccess(state, action);
    case DELETE_COMMENTVOTE_SUCCESS: return deleteCommentVoteSuccess(state, action);
    case REQUEST_COMMENTS_SUCCESS:
      let transformed = {};
      action.data.data.comments.forEach(comment => transformed[comment.id] = comment);

      return {
        ...state, 
        ...transformed
      };

    case SET_COMMENTS_SORT:
      console.log(action.postId)
      console.log(action.commentIds)
      console.log(action.sort)
      let newState = { ...state };
      action.commentIds.forEach(
        x => delete newState[x]
      );

      return {
        ...newState
      };
  
    default:
      return state
  }
}

function allComments(state = [], action) {
  switch (action.type) {
    case REQUEST_COMMENTS_SUCCESS:
      return state
    default:
      return state
  }
}

 const commentsReducer = combineReducers({
  byId: commentsById,
  allIds: allComments,
  ui : commentsUi
})

export default commentsReducer;