import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE,
  CLEAR_POSTS,
  SET_SORT,
  SET_TOP,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  cursor: null,
  sort: 1,
  top: '',
  hasNextPage: null,
  loading: false,
  error: null,
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
    //console.log(action.data)
    let asdf = {};
    action.data.posts.forEach(element => {
      asdf[element.id] = element
    });
      return { 
        ...state,
        posts: [...state.posts, ...action.data.posts],
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
        
    
    
    default:
      return state;
  }
};

export default reducer;