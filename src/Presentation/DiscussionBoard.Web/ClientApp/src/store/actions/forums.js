import {
  REQUEST_FORUMS_START,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_FORUMS_FAILURE,
  SET_FORUM_SORT,
  SET_FORUM_TOP
} from './actionTypes';
import { getForums } from '../../api/forumsService';

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

export const setForumSort = (forumId, sort) => {
  return {
    type: SET_FORUM_SORT,
    sort: sort,
    forumId: forumId
  };
};

export const setForumTop = (forumId, top) => {
  return {
    type: SET_FORUM_TOP,
    top: top,
    forumId: forumId
  };
};