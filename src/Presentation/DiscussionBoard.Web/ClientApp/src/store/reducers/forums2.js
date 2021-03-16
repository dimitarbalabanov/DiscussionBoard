import { combineReducers } from 'redux';
import {
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUMS_SUCCESS
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
      top: ''
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

function forumsById(state = {}, action) {
  switch (action.type) {
    
    case REQUEST_FORUM_SUCCESS:
      return requestForumSuccess(state, action);
    case REQUEST_FORUMS_SUCCESS:
      return requestForumsSuccess(state, action);  
      
    default:
      return state
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