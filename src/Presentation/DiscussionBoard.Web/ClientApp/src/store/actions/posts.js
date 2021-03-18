import {
    REQUEST_POSTS_SUCCESS,
    REQUEST_POSTS_START,
    REQUEST_POSTS_FAILURE,
    CLEAR_POSTS
} from './actionTypes';
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
    effect() { },
    forumId: forumId
  }
}