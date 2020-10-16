import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case REQUEST_POSTS_START: 
      return { 
        ...state,
        error: null,
        loading: true
      };

    case REQUEST_POSTS_SUCCESS: 
      return { 
        ...state,
        posts: action.data.posts,
        loading: false,
        error: null
      };

    case REQUEST_POSTS_FAILURE:
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