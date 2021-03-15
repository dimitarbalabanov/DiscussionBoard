import {
    REQUEST_POSTS_SUCCESS,
    REQUEST_POSTS_START,
    REQUEST_POSTS_FAILURE,
    CLEAR_POSTS
} from './actionTypes';
//import { showSnackbar } from './snackbar';
import { getPosts } from '../../api/postsService';

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}

export const fetchPosts = (sort, top, forumId, cursor) => {
  return {
    types: [
      REQUEST_POSTS_START,
      REQUEST_POSTS_SUCCESS,
      REQUEST_POSTS_FAILURE
    ],
    callApi: () => getPosts(sort, top, forumId, cursor),
    effect({ dispatch, state, type}) {
      // if (type === REQUEST_POSTS_SUCCESS) {
      //   dispatch(showSnackbar('success', 'Successfully fetched the POSTS.'))
      // }
      // if (type === REQUEST_POSTS_FAILURE) {
      //   dispatch(showSnackbar('error',  "posts error"))
      // }
    }
  }
}