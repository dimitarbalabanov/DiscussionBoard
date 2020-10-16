import {
  REQUEST_FORUM_START,
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUM_FAILURE
} from '../actions/actionTypes';

const initialState = {
  forum: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_FORUM_START: 
      return { 
        ...state,
        loading: true,
        error: null
      };

    case REQUEST_FORUM_SUCCESS: 
      return {
        ...state, 
        forum: action.data,
        loading: false,
        error: null
      };

    case REQUEST_FORUM_FAILURE: 
      return  {
        ...state,
        loading: false,
        error: action.error 
      };

    default:
      return state;
  }
};

export default reducer;
