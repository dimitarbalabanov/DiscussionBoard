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
    effect() { }
  }
};