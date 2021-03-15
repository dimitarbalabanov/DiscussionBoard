import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE,
  CLEAR_POSTS,
  SET_SORT,
  SET_TOP
} from '../actions/actionTypes';

const initialState = {
  postIds: [],
  cursor: null,
  sort: 1,
  top: '',
  loading: false,
  error: null,
  something: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case REQUEST_POSTS_START: 
      return { 
        ...state,
        error: null,
        loading: true,
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
      
    case CLEAR_POSTS:
      return { 
        ...state,
        posts: [],
        cursor: null
      };
      
    case SET_SORT:
      return {
        ...state,
        posts: [],
        cursor: null,
        sort: action.sort
      };

    case SET_TOP:
      return {
        ...state,
        posts: [],
        cursor: null,
        top: action.top
      };
        
    case AUTH_START: 
      return {
        ...state,
        something: true
      }
    
    default:
      return state;
  }
};

export default reducer;