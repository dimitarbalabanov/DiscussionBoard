import {
  SET_POST_SORT,
  REQUEST_COMMENTS_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  CREATE_COMMENTVOTE_SUCCESS,
  UPDATE_COMMENTVOTE_SUCCESS,
  DELETE_COMMENTVOTE_SUCCESS,
} from '../../actions/actionTypes';
import { combineReducers } from "redux"

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

const requestCommentsSuccess = (state, action) => {
  let transformed = {};
  action.data.comments.forEach(comment => transformed[comment.id] = comment);

  return {
    ...state, 
    ...transformed
  };
}

const setPostSort = (state, action) => {
  let newState = { ...state };
  action.commentIds.forEach(
    x => delete newState[x]
  );

  return {
    ...newState
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
    case REQUEST_COMMENTS_SUCCESS: return requestCommentsSuccess(state, action);
    case SET_POST_SORT: return setPostSort(state, action);
    default: return state;
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
  allIds: allComments
})

export default commentsReducer;