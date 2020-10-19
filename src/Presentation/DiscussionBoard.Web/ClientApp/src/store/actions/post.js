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
} from './actionTypes';
import { 
  showSnackbar 
} from './snackbar';
import {
  getPostById,
  createPost as createPostApi,
  updatePostById,
  deletePostById
} from '../../api/postsService';

export const fetchPostById = (postId) => {
  return {
    types: [
      REQUEST_POST_START,
      REQUEST_POST_SUCCESS,
      REQUEST_POST_FAILURE
    ],
    callApi: () => getPostById(postId),
    effect({ dispatch, state, type}) {
      if (type === REQUEST_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully fetched the post with id: .`));
      }
      if (type === REQUEST_POST_FAILURE) {
        dispatch(showSnackbar('error', 'error fetching post'));
      }
    }
  }
};

export const createPost = (forumId, title, content) => {
  return {
    types: [
      CREATE_POST_START,
      CREATE_POST_SUCCESS,
      CREATE_POST_FAILURE
    ],
    callApi: () => createPostApi(forumId, title, content),
    effect({ dispatch, state, type}) {
      if (type === CREATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a post.`))
      }
      if (type === CREATE_POST_FAILURE) {
        dispatch(showSnackbar('error', 'error creating post'))
      }
    }
  }
};

export const updatePost = (postId, newPost) => {
  return {
    types: [
      UPDATE_POST_START,
      UPDATE_POST_SUCCESS,
      UPDATE_POST_FAILURE
    ],
    callApi: () => updatePostById(postId, newPost),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the post.`))
      }
      if (type === UPDATE_POST_FAILURE) {
        dispatch(showSnackbar('error', 'error updating post'))
      }
    }
  }
};

export const deletePost = (postId) => {
  return {
    types: [
      DELETE_POST_START,
      DELETE_POST_SUCCESS,
      DELETE_POST_FAILURE
    ],
    callApi: () => deletePostById(postId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the post.`))
      }
      if (type === DELETE_POST_FAILURE) {
        dispatch(showSnackbar('error', 'error deleting post'))
      }
    }
  }
};

export const createPostReset = () => {
  return {
    type: CREATE_POST_RESET
  };
}