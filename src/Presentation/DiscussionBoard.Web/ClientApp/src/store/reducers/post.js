import {
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
} from '../actions/actionTypes';

const initialPostState = {
  post: null,
  postLoading: false,
  postError: null
};

const initialCreatePostState = {
  createPostSuccess: false,
  createPostLoading: false,
  createPostError: null,
}

const initialUpdatePostState = {
  updatePostLoading: false,
  updatePostError: null,
  updatePostSuccess: false
};

const initialDeletePostState = {
  deletePostLoading: false,
  deletePostError: null,
  deletePostSuccess: false
};

const initialState = {
  ...initialPostState,
  ...initialCreatePostState,
  ...initialUpdatePostState,
  ...initialDeletePostState,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_POST_START: 
      return { 
        ...state,
        postLoading: true,
        postError: null
      };

    case REQUEST_POST_SUCCESS:
      return { 
        ...state,
        post: action.data,
        postLoading: false,
        postError: null
      };

    case REQUEST_POST_FAILURE: 
      return {
        ...state, 
        postLoading: false,
        postError: action.error
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
        // forum: {
        //   ...state.forum,
        //   posts: [action.newPost, ...state.forum.posts]
        // },
        // newPostId: action.newPost.id,
        createPostSuccess: true,
        createPostLoading: false,
        createPostError: null
      };

    case CREATE_POST_FAILURE: 
      return {
        ...state,
        createPostError: action.error,
        createPostLoading: false,
        createPostSuccess: false
      };

    case UPDATE_POST_START: 
      return { 
        ...state,
        updatePostSuccess: false,
        updatePostError: null,
        updatePostLoading: true
      };

    case UPDATE_POST_SUCCESS:
      return { 
        ...state,
        post: {
          ...state.post,
          title: action.updatedData.title,
          content: action.updatedData.content
        },
        updatePostSuccess: true,
        updatePostLoading: false,
        updatePostError: null
      };

    case UPDATE_POST_FAILURE: 
      return {
        ...state, 
        updatePostSuccess: false,
        updatePostLoading: false,
        updatePostError: action.error
      };

    case DELETE_POST_START: 
      return { 
        ...state,
        deletePostSuccess: false,
        deletePostError: null,
        deletePostLoading: true
      };

    case DELETE_POST_SUCCESS: 
      return { 
        ...state,
        deletePostSuccess: true,
        deletePostLoading: false,
        deletePostError: null
      };

    case DELETE_POST_FAILURE: 
      return {
        ...state, 
        deletePostSuccess: false,
        deletePostLoading: false,
        deletePostError: action.error
      };

    default: 
      return state;
  }
};

export default reducer;