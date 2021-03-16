import {
  REQUEST_POST_START,
  REQUEST_POST_SUCCESS,
  REQUEST_POST_FAILURE,

  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_RESET,

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
  createPostId: null
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

const initialCreateSavedPostState = {
  createSavedPostLoading: false,
  createSavedPostError: null,
  createSavedPostSuccess: false
}

const initialDeleteSavedPostState = {
  deleteSavedPostLoading: false,
  deleteSavedPostError: null,
  deleteSavedPostSuccess: false
}

const initialCreatePostVoteState = {
  createPostVoteId: null,
  createPostVoteLoading: false,
  createPostVoteError: null
};

const initialUpdatePostVoteState = {
  updatePostVoteId: null,
  updatePostVoteLoading: false,
  updatePostVoteError: null
};

const initialDeletePostVoteState = {
  deletePostVoteId: null,
  deletePostVoteLoading: false,
  deletePostVoteError: null
};

const initialState = {
  ...initialPostState,
  ...initialCreatePostState,
  ...initialUpdatePostState,
  ...initialDeletePostState,
  ...initialCreateSavedPostState,
  ...initialDeleteSavedPostState,
  ...initialCreatePostVoteState,
  ...initialUpdatePostVoteState,
  ...initialDeletePostVoteState
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
      console.log(action)
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
        createPostSuccess: true,
        createPostLoading: false,
        createPostError: null,
        post: action.data
      };

    case CREATE_POST_FAILURE: 
      return {
        ...state,
        createPostError: action.error,
        createPostLoading: false,
        createPostSuccess: false
      };

      case CREATE_POST_RESET: 
      return {
        ...state,
        ...initialCreatePostState
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
    console.log(action)
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

      case CREATE_SAVEDPOST_START: 
      return { 
        ...state,
        createSavedPostSuccess: false,
        createSavedPostError: null,
        createSavedPostLoading: true
      };

    case CREATE_SAVEDPOST_SUCCESS:
      return { 
        ...state,
        post: {
          ...state.post,
          isSaved: true
        },
        createSavedPostSuccess: true,
        createSavedPostLoading: false,
        createSavedPostError: null
      };

    case CREATE_SAVEDPOST_FAILURE: 
      return {
        ...state, 
        createSavedPostSuccess: false,
        createSavedPostLoading: false,
        createSavedPostError: action.error
      };

    case DELETE_SAVEDPOST_START: 
      return { 
        ...state,
        deleteSavedPostSuccess: false,
        deleteSavedPostError: null,
        deleteSavedPostLoading: true
      };

    case DELETE_SAVEDPOST_SUCCESS: 
      return { 
        ...state,
        post: {
          ...state.post,
          isSaved: false
        },
        deleteSavedPostSuccess: true,
        deleteSavedPostLoading: false,
        deleteSavedPostError: null
      };

    case DELETE_SAVEDPOST_FAILURE: 
      return {
        ...state, 
        deleteSavedPostSuccess: false,
        deleteSavedPostLoading: false,
        deleteSavedPostError: action.error
      };

      case CREATE_POSTVOTE_START:
      return { 
        ...state,
        createPostVoteLoading: true, 
        createPostVoteError: null
      };
    
    case CREATE_POSTVOTE_SUCCESS:
      return { 
        ...state,
        post: {
          ...state.post,
          votesScore: action.voteType === 'up' ? state.post.votesScore + 1 : state.post.votesScore - 1,
          voteId: action.data,
          voteType: action.voteType
        },
        createPostVoteLoading: false,
        createPostVoteError: null
      };

    case CREATE_POSTVOTE_FAILURE:
      return { 
        ...state,
        createPostVoteError: action.error,
        createPostVoteLoading: false
      };

    case UPDATE_POSTVOTE_START:
      return { 
        ...state,
        updatePostVoteError: null,
        updatePostVoteLoading: true 
      };

    case UPDATE_POSTVOTE_SUCCESS:
      return { 
        ...state,
        post: {
          ...state.post,
          votesScore: action.voteType === 'up' ? state.post.votesScore + 2 : state.post.votesScore - 2,
          voteType: action.voteType
        },
        updatePostVoteLoading: false,
        updatePostVoteError: null
      };

    case UPDATE_POSTVOTE_FAILURE:
      return { 
        ...state,
        updatePostVoteLoading: false,
        updatePostVoteError: action.error
      };

    case DELETE_POSTVOTE_START:
      return { 
        ...state,
        deletePostVoteError: null,
        deletePostVoteLoading: true 
      };

    case DELETE_POSTVOTE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          votesScore: action.voteType === 'up' ? state.post.votesScore - 1 : state.post.votesScore + 1,
          voteType: null,
          voteId: null
        },
        deletePostVoteLoading: false,
        deletePostVoteError: null
      };

    case DELETE_POSTVOTE_FAILURE:
      return { 
        ...state,
        deletePostVoteError: action.error,
        deletePostVoteLoading: false
      };

    default: 
      return state;
  }
};

export default reducer;