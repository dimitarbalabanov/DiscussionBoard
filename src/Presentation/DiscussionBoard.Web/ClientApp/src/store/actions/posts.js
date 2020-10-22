import {
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_START,
  REQUEST_POSTS_FAILURE
} from './actionTypes';
import { showSnackbar } from './snackbar';
import { getPosts } from '../../api/postsService';

export const fetchPosts = (forumId, pageNumber) => {
  return {
    types: [
      REQUEST_POSTS_START,
      REQUEST_POSTS_SUCCESS,
      REQUEST_POSTS_FAILURE
    ],
    callApi: () => getPosts(forumId, pageNumber),
    effect({ dispatch, state, type}) {
      if (type === REQUEST_POSTS_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully fetched the POSTS.'))
      }
      if (type === REQUEST_POSTS_FAILURE) {
        dispatch(showSnackbar('error',  "posts error"))
      }
    }
  }
}