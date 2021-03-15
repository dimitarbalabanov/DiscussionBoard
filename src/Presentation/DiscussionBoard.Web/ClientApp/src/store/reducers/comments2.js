import {
  REQUEST_COMMENTS_SUCCESS,
  SET_COMMENTS_SORT,
  UPDATE_COMMENT_SUCCESS,
  CREATE_COMMENTVOTE_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../actions/actionTypes';
import { combineReducers } from "redux"

function commentsById(state = {}, action) {
  switch (action.type) {
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


     case CREATE_COMMENT_SUCCESS:

      const comment = {
        id: action.data.id,
        createdOn : action.data.createdOn,
        content : action.content,
        creatorUserName : action.username,
        votesScore: 0
      };

      return { 
        ...state,
        [action.data.id]: comment,
      };


      case UPDATE_COMMENT_SUCCESS:
        const { commentId, content } = action;

        return { 
          ...state,
          [commentId] : {
            ...state[commentId],
            content: content
          }
        };

      case DELETE_COMMENT_SUCCESS:
        const deleteState = { ...state };
        delete deleteState[action.commentId] 
        return { 
          ...deleteState,
          // comments: state.comments.filter(c => c.id !== action.commentId),
        };

        case CREATE_COMMENTVOTE_SUCCESS:
          console.log(action)
          const cvCommentId = action.commentId;
          
        const { voteType } = action;
        const { id } = action.data;

        return { 
          ...state,
          [cvCommentId] : {
            ...state[cvCommentId],
            voteType: voteType,
            voteId: id,
            votesScore: +state[cvCommentId].votesScore + +voteType
          }
        };
      

    case REQUEST_COMMENTS_SUCCESS:
      let transformed = {};
      action.data.data.comments.forEach(comment => transformed[comment.id] = comment);

      return {
        ...state, 
        ...transformed
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
  allIds: allComments
})

export default commentsReducer;