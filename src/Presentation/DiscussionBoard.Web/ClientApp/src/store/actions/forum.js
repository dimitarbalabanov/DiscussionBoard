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
    effect({ dispatch, state, type}) {
      if (type === REQUEST_FORUM_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully fetched the forum with id: ${forumId}.`))
      }
      if (type === REQUEST_FORUM_FAILURE) {
        dispatch(showSnackbar('error', `Error fetching the forum with id: ${forumId}.`))
      }
    }
  }
}