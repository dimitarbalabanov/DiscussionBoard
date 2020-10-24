import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  cursor: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case REQUEST_POSTS_START: 
      return { 
        ...state,
        error: null,
        loading: true,
        cursor: null
      };

    case REQUEST_POSTS_SUCCESS: 
      return { 
        ...state,
        posts: [...state.posts, ...action.data.data.posts],
        cursor: action.data.cursor,
        loading: false,
        error: null
      };

    case REQUEST_POSTS_FAILURE:
      return { 
        ...state,
        cursor: null,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;