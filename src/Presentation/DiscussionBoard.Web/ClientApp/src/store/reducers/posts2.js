import { TramRounded } from '@material-ui/icons';
import { combineReducers } from 'redux';
import {
  SET_COMMENTS_SORT,
  SET_COMMENTS_TOP,
  REQUEST_COMMENTS_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  CREATE_POSTVOTE_SUCCESS,
  UPDATE_POSTVOTE_SUCCESS,
  DELETE_POSTVOTE_SUCCESS,
  CREATE_SAVEDPOST_SUCCESS,
  DELETE_SAVEDPOST_SUCCESS,
} from '../actions/actionTypes';

const requestCommentsSuccess = (state, action) => {
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
}

const createCommentSuccess = (state, action) => {
  const createPostId = action.postId;
  const createCommentId = action.data.id;
  
  return {
    ...state,
    [createPostId]: {
      ...state[createPostId],
      commentsCount: state[createPostId].commentsCount + 1,
      comments: [createCommentId, ...(state[createPostId].comments || [])]
    }
  }
}

const deleteCommentSuccess = (state, action) => {
  const deletePostId = action.postId;
  const deleteCommentId = action.commentId;
  
  return {
    ...state,
    [deletePostId]: {
      ...state[deletePostId],
      commentsCount: state[deletePostId].commentsCount - 1,
      comments: state[deletePostId].comments.filter(x => x !== deleteCommentId)
    }
  }

}

const requestPostsSuccess = (state, action) => {
  let transformed = {};
  action.data.data.posts.forEach(post => transformed[post.id] = post);
  
  return {
    ...state, 
    ...transformed
  };
  }


function requestPostSuccess(state, action) {
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
}

const updatePostSuccess = (state, action) => {
  const { postId, title, content } = action;
    return { 
      ...state,
      [postId] : {
        ...state[postId],
        title: title,
        content: content
      }
    };
}
const deletePostSuccess = (state, action) => {
  const { postId } = action;
  const newState = { ...state };
  delete newState[postId] 

  return { 
    ...newState,
  };
}

const createPostVoteSuccess = (state, action) => {
  console.log(action)
  const {postId, voteType, data } = action;
  const { id } = data;

    return { 
      ...state,
      [postId] : {
        ...state[postId],
        voteType: voteType,
        voteId: id,
        votesScore: +state[postId].votesScore + +voteType
      }
    };
}

const updatePostVoteSuccess = (state, action) => {
  const {postId, voteType } = action;

    return { 
      ...state,
      [postId] : {
        ...state[postId],
        voteType: voteType,
        votesScore: voteType === '1' ? +state[postId].votesScore + 2 : +state[postId].votesScore - 2
      }
    };
}

const deletePostVoteSuccess = (state, action) => {
  const {postId, voteType } = action;

    return { 
      ...state,
      [postId] : {
        ...state[postId],
        voteType: null,
        voteId: null,
        votesScore: voteType === '1' ? +state[postId].votesScore - 1 : +state[postId].votesScore + 1,
      }
    };
}

const createSavedPostSuccess = (state, action) => {
  const { postId } = action;

    return { 
      ...state,
      [postId] : {
        ...state[postId],
        isSaved: true
      }
    };
}

const deleteSavedPostSuccess = (state, action) => {
  const { postId } = action;

    return { 
      ...state,
      [postId] : {
        ...state[postId],
        isSaved: false
      }
    };
}

function postsById(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS_SUCCESS:
      return requestPostsSuccess(state, action);

    case REQUEST_POST_SUCCESS:
      return requestPostSuccess(state, action);

    case REQUEST_COMMENTS_SUCCESS:
      return requestCommentsSuccess(state, action);

    case CREATE_COMMENT_SUCCESS:
      return createCommentSuccess(state, action);

    case DELETE_COMMENT_SUCCESS:
      return deleteCommentSuccess(state, action);
        
    case UPDATE_POST_SUCCESS:
      return updatePostSuccess(state, action);
      
    case DELETE_POST_SUCCESS: 
      return deletePostSuccess(state, action);

      case CREATE_POSTVOTE_SUCCESS:
        return createPostVoteSuccess(state, action);

      case UPDATE_POSTVOTE_SUCCESS:
        return updatePostVoteSuccess(state, action);

      case DELETE_POSTVOTE_SUCCESS:
        return deletePostVoteSuccess(state, action);

      case CREATE_SAVEDPOST_SUCCESS:
        return createSavedPostSuccess(state, action);

      case DELETE_SAVEDPOST_SUCCESS: 
        return deleteSavedPostSuccess(state, action);

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

    default:
      return state
  }
}

function allPosts(state = [], action) {
  switch (action.type) {
    case REQUEST_POST_SUCCESS:
      return state.concat(action.data.id);

    case REQUEST_POSTS_SUCCESS:
      return state.concat(action.data.data.posts.map(x => x.id));

    case DELETE_POST_SUCCESS: 
      return state.filter(id => id !== action.postId);

    default:
      return state
  }
}

const postsReducer = combineReducers({
  byId: postsById,
  allIds: allPosts
});

export default postsReducer;