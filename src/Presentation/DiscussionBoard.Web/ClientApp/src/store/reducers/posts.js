import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE,
  CLEAR_POSTS
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  cursor: null,
  sort: 1,
  top: null,
  hasNextPage: null,
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
        cursor: null,
        hasNextPage: null
      };

    case REQUEST_POSTS_SUCCESS: 
      return { 
        ...state,

        posts: [...action.data.posts],
        cursor: action.data.cursor,
        hasNextPage: action.data.cursor !== null,
        loading: false,
        error: null
      };

    case REQUEST_POSTS_FAILURE:
      return { 
        ...state,
        cursor: null,
        hasNextPage: null,
        error: action.error,
        loading: false
      }; 

    case CLEAR_POSTS:
      return { 
        ...state,
        posts: [],
        cursor: null
      };

    default:
      return state;
  }
};

export default reducer;