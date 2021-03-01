import {
  REQUEST_FORUMS_START,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_FORUMS_FAILURE
} from './actionTypes';
import { getForums } from '../../api/forumsService';
import { showSnackbar } from './snackbar';

export const fetchForums = () => {
  return {
    types: [
      REQUEST_FORUMS_START,
      REQUEST_FORUMS_SUCCESS,
      REQUEST_FORUMS_FAILURE
    ],
    callApi: () => getForums(),
    effect({ dispatch, state, type}) {
      if (type === REQUEST_FORUMS_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully fetched the forums.'))
      }
      if (type === REQUEST_FORUMS_FAILURE) {
        dispatch(showSnackbar('error', " Error fetching the forums."))
      }
    }
  }
};