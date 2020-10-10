import {
  FETCH_FORUMS_START,
  FETCH_FORUMS_SUCCESS,
  FETCH_FORUMS_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
} from '../actions/actionTypes';

const initialState = {
  forums: [],
  forumsLoading: false,
  forumsError: null,
  posts: [],
  postsLoading: false,
  postsError: null
};

const reducer = (state = initialState, action) => {
  
    switch (action.type) {
      
        case FETCH_FORUMS_START: 
          return { 
            ...state,
            forumsError: null,
            forumsLoading: true
          };

        case FETCH_FORUMS_SUCCESS:
          console.log(action.data)
          return { 
            ...state,
            forums: action.data.forums,
            forumsError: null,
            forumsLoading: false
          };

        case FETCH_FORUMS_FAILURE: 
          return { 
            ...state,
            forumsError: action.error,
            forumsLoading: false
          };

        case FETCH_POSTS_START: 
          return { 
            ...state,
            postsError: null,
            postsLoading: true
          };

        case FETCH_POSTS_SUCCESS: 
          return { 
            ...state,
            posts: action.data.posts,
            postsLoading: false,
            postsError: null
          };

        case FETCH_POSTS_FAILURE:
          return { 
            ...state,
            postsError: action.error,
            postsLoading: false
          };

        default:
          return state;
    }
};

export default reducer;