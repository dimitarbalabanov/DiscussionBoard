import {
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_START,
  REQUEST_POSTS_FAILURE,
  CLEAR_POSTS,
  SET_SORT,
  SET_TOP
} from './actionTypes';
import { getPosts } from '../../api/postsService';

export const setSort = (sort) => {
  return {
    type: SET_SORT,
    sort: sort
  };
};

export const setTop = (top) => {
  return {
    type: SET_TOP,
    top: top
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}

export const fetchPosts = (sort, top, cursor) => {
  return {
    types: [
      REQUEST_POSTS_START,
      REQUEST_POSTS_SUCCESS,
      REQUEST_POSTS_FAILURE
    ],
    callApi: () => getPosts(sort, top, null, cursor),
    effect() {}
  }
}