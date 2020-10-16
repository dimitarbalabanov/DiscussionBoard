import {
  REQUEST_FORUMS_START,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_FORUMS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  forums: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case REQUEST_FORUMS_START: 
      return { 
        ...state,
        error: null,
        loading: true
      };

    case REQUEST_FORUMS_SUCCESS:
      return { 
        ...state,
        forums: action.data.forums,
        error: null,
        loading: false
      };

    case REQUEST_FORUMS_FAILURE: 
      return { 
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;