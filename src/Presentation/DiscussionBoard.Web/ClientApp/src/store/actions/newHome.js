import {
  FETCH_FORUMS_SUCCESS,
  FETCH_FORUMS_START,
  FETCH_FORUMS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
  FETCH_POSTS_FAILURE,
} from './actionTypes';

import { showSnackbar } from './snackbar';

import { getAllForums } from '../../api/forumsService';
import { getAllPosts } from '../../api/postsService';

export function newFetchForums() {
  return {
    types: [
      FETCH_FORUMS_START,
      FETCH_FORUMS_SUCCESS,
      FETCH_FORUMS_FAILURE
    ],
    callAPI: () => getAllForums(),
    effect({ dispatch, state, type}) {
      if (type === FETCH_FORUMS_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully fetched the forums.'))
      }
      if (type === FETCH_FORUMS_FAILURE) {
        dispatch(showSnackbar('error', state.home.forumsError ?? "forums error"))
      }
    }
  }
}

export function newFetchPosts() {
  return {
    types: [
      FETCH_POSTS_START,
      FETCH_POSTS_SUCCESS,
      FETCH_POSTS_FAILURE
    ],
    callAPI: () => getAllPosts(),
    effect({ dispatch, state, type}) {
      if (type === FETCH_POSTS_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully fetched the POSTS.'))
      }
      if (type === FETCH_POSTS_FAILURE) {
        console.log()
        dispatch(showSnackbar('error', state.home.postsError ?? "posts error"))
      }
    }
  }
}