import {
  REQUEST_POSTS_START,
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_FAILURE,

  REQUEST_POST_START,
  REQUEST_POST_SUCCESS,
  REQUEST_POST_FAILURE,

  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,

  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,

  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,

  CREATE_SAVEDPOST_START,
  CREATE_SAVEDPOST_SUCCESS,
  CREATE_SAVEDPOST_FAILURE,

  DELETE_SAVEDPOST_START,
  DELETE_SAVEDPOST_SUCCESS,
  DELETE_SAVEDPOST_FAILURE,

  CREATE_POSTVOTE_START,
  CREATE_POSTVOTE_SUCCESS,
  CREATE_POSTVOTE_FAILURE,

  UPDATE_POSTVOTE_START,
  UPDATE_POSTVOTE_SUCCESS,
  UPDATE_POSTVOTE_FAILURE,

  DELETE_POSTVOTE_START,
  DELETE_POSTVOTE_SUCCESS,
  DELETE_POSTVOTE_FAILURE,
} from '../../actions/actionTypes';

const initialState = {
  postsLoading: false,

  postLoading: false,

  createPostSuccess: false,
  createPostLoading: false,
  createPostError: null,

  updatePostLoading: false,
  updatePostError: null,

  deletePostLoading: false,
  deletePostId: null,

  savedPostLoading: false,
  savedPostId: null,

  postVoteLoading: false,
  postVotePostId: null
};

const postsUi = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_POSTS_START: 
    return { 
      ...state,
      postsLoading: true,
    };

    case REQUEST_POSTS_SUCCESS: 
      return { 
        ...state,
        postsLoading: false
      };

    case REQUEST_POSTS_FAILURE:
      return { 
        ...state,
        postsLoading: false
      }; 

    case REQUEST_POST_START: 
      return { 
        ...state,
        postLoading: true
      };

    case REQUEST_POST_SUCCESS:
      return { 
        ...state,
        postLoading: false
      };

    case REQUEST_POST_FAILURE: 
      return {
        ...state, 
        postLoading: false
      };

    case CREATE_POST_START: 
      return {
        ...state,
        createPostSuccess: false,
        createPostLoading: true,
        createPostError: null
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostSuccess: true,
        createPostLoading: false,
        createPostError: null
      };

    case CREATE_POST_FAILURE: 
      return {
        ...state,
        createPostSuccess: false,
        createPostLoading: false,
        createPostError: action.error
      };

    case UPDATE_POST_START: 
      return { 
        ...state,
        updatePostLoading: true,
        updatePostError: null
      };

    case UPDATE_POST_SUCCESS:
      return { 
        ...state,
        updatePostLoading: false,
        updatePostError: null
      };

    case UPDATE_POST_FAILURE: 
      return {
        ...state, 
        updatePostLoading: false,
        updatePostError: action.error
      };

    case DELETE_POST_START: 
      return { 
        ...state,
        deletePostLoading: true,
        deletePostId: action.postId
      };

    case DELETE_POST_SUCCESS: 
      return { 
        ...state,
        deletePostLoading: false,
        deletePostId: null
      };

    case DELETE_POST_FAILURE: 
      return {
        ...state, 
        deletePostLoading: false,
        deletePostId: null
      };

    case CREATE_SAVEDPOST_START: 
    case DELETE_SAVEDPOST_START: 
      return { 
        ...state,
        savedPostLoading: true,
        savedPostId: action.postId,
      };

    case CREATE_SAVEDPOST_SUCCESS:
    case DELETE_SAVEDPOST_SUCCESS: 
      return { 
        ...state,
        savedPostLoading: false,
        savedPostId: null,
      };

    case CREATE_SAVEDPOST_FAILURE: 
    case DELETE_SAVEDPOST_FAILURE: 
      return { 
        ...state,
        savedPostLoading: false,
        savedPostId: null,
      };

    case CREATE_POSTVOTE_START:
    case UPDATE_POSTVOTE_START:
    case DELETE_POSTVOTE_START:
      return { 
        ...state,
        postVoteLoading: true, 
        postVotePostId: action.postId
      };
    
    case CREATE_POSTVOTE_SUCCESS:
    case UPDATE_POSTVOTE_SUCCESS:
    case DELETE_POSTVOTE_SUCCESS:
      return { 
        ...state,
        postVoteLoading: true, 
        postVotePostId: null
      };

    case CREATE_POSTVOTE_FAILURE:
    case UPDATE_POSTVOTE_FAILURE:
    case DELETE_POSTVOTE_FAILURE:
      return { 
        ...state,
        postVoteLoading: true, 
        postVotePostId: null
      };

    default: 
      return state;
  }
};

export default postsUi;