import { combineReducers } from 'redux';
import {
  SET_COMMENTS_SORT,
  SET_COMMENTS_TOP,
  REQUEST_COMMENTS_SUCCESS,
  REQUEST_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../actions/actionTypes';

function postsById(state = {}, action) {
  switch (action.type) {
    
    case REQUEST_POST_SUCCESS:
      console.log(action);
      const reqPost = action.data;

      return {
        ...state,
        [reqPost.id]: {
          ...state[reqPost.id],
          ...reqPost,
          sort: 1,
          top: ''
        }
      }
    
      case SET_COMMENTS_SORT:
        const sortPostId = action.postId;
        const sort = action.sort;

        return {
          ...state,
          [sortPostId]: {
            ...state[sortPostId],
            comments: [],
            sort: sort
          }
        }

    case SET_COMMENTS_TOP:
      const topPostId = action.postId;
        const top = action.sort;

        return {
          ...state,
          [topPostId]: {
            ...state.topPostId,
            comments: [],
            top: top
          }
        }

    case REQUEST_COMMENTS_SUCCESS:
      const postId = action.postId;
      const comments = action.data.data.comments;
      const commentIds = comments.map(x => x.id);
      const post = state[postId] !== undefined ? state[postId] : { };

      return {
        ...state,
        [postId]: {
          ...post,
          comments: (post.comments || []).concat(commentIds)
        }
      }

      case CREATE_COMMENT_SUCCESS:
        const createPostId = action.postId;
        const createCommentId = action.data.id;
  
        return {
          ...state,
          [createPostId]: {
            ...state[createPostId],
            comments: [createCommentId, ...(state[createPostId].comments || [])]
          }
        }

        case DELETE_COMMENT_SUCCESS:
        const deletePostId = action.postId;
        const deleteCommentId = action.commentId;
        
        return {
          ...state,
          [deletePostId]: {
            ...state[deletePostId],
            comments: state[deletePostId].comments.filter(x => x !== deleteCommentId)
          }
        }
      
    default:
      return state
  }
}

function allPosts(state = [], action) {
  return state;
}

const postsReducer = combineReducers({
  byId: postsById,
  allIds: allPosts
});

export default postsReducer;