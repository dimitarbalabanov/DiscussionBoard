import { combineReducers } from 'redux';
import {
  REQUEST_FORUM_SUCCESS
} from '../actions/actionTypes';

function forumsById(state = {}, action) {
  switch (action.type) {
    
    case REQUEST_FORUM_SUCCESS:
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
      
    default:
      return state
  }
}

function allForums(state = [], action) {
  return state;
}

const forumsReducer = combineReducers({
  byId: forumsById,
  allIds: allForums
});

export default forumsReducer;