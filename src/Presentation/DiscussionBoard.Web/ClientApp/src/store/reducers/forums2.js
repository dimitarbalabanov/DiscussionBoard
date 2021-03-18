import { combineReducers } from 'redux';
import {
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_POSTS_SUCCESS,
  SET_FORUM_SORT,
  SET_FORUM_TOP
} from '../actions/actionTypes';

const requestForumSuccess = (state, action) => {
  console.log(action);
  const forum = action.data;

  return {
    ...state,
    [forum.id]: {
      ...state[forum.id],
      ...forum,
      sort: 1,
      top: '',
      posts: []
    }
  }
}

const setForumSort = (state, action) => {
  const { forumId, sort } = action;

  return {
    ...state,
    [forumId]: {
      ...state[forumId],
      sort: sort,
      posts: [],
      cursor: null
    }
  }
}

const setForumTop = (state, action) => {
  const { forumId, top } = action;

  return {
    ...state,
    [forumId]: {
      ...state[forumId],
      top: top,
      posts: [],
      cursor: null
    }
  }
}

const requestForumsSuccess = (state, action) => {
  let transformed = {};
  action.data.forums.forEach(forum => transformed[forum.id] = forum);
  
  return {
    ...state, 
    ...transformed
  };
}


const requestPostsSuccess = (state, action) => {
  const forumId = action.forumId;
  const posts = action.data.data.posts;
  const postIds = posts.map(x => x.id);
  const forum = state[forumId] !== undefined ? state[forumId] : { };
  const cursor = btoa(posts[posts.length - 1].id + '#' + posts[posts.length - 1].createdOn);

  return {
    ...state,
    [forumId]: {
      ...forum,
      posts: (forum.posts || []).concat(postIds),
      cursor: cursor
    }
  }
}


function forumsById(state = {}, action) {
  switch (action.type) {
    case REQUEST_FORUM_SUCCESS: return requestForumSuccess(state, action);
    case REQUEST_FORUMS_SUCCESS: return requestForumsSuccess(state, action);  
    case REQUEST_POSTS_SUCCESS: return requestPostsSuccess(state, action); 
    case SET_FORUM_SORT: return setForumSort(state, action); 
    case SET_FORUM_TOP: return setForumTop(state, action); 
    default: return state;
  }
}

function allForums(state = [], action) {
  switch (action.type) {
    case REQUEST_FORUM_SUCCESS:
      return state.concat(action.data.id);

    case REQUEST_FORUMS_SUCCESS:
      return state.concat(action.data.forums.map(x => x.id));

    default:
      return state
  }
}
const forumsReducer = combineReducers({
  byId: forumsById,
  allIds: allForums
});

export default forumsReducer;