import {
  REQUEST_FORUM_START,
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUM_FAILURE
} from './actionTypes';
import { getForumById } from '../../api/forumsService';
import { showSnackbar } from './snackbar';

export const fetchForumById = (forumId) => {
  return {
    types: [
      REQUEST_FORUM_START,
      REQUEST_FORUM_SUCCESS,
      REQUEST_FORUM_FAILURE
    ],
    callApi: () => getForumById(forumId),
    effect({ dispatch, state, type}) {}
  }
}