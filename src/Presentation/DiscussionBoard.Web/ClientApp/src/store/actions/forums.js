import {
  REQUEST_FORUMS_START,
  REQUEST_FORUMS_SUCCESS,
  REQUEST_FORUMS_FAILURE,
  REQUEST_FORUM_START,
  REQUEST_FORUM_SUCCESS,
  REQUEST_FORUM_FAILURE,
  SET_FORUM_SORT,
  SET_FORUM_TOP
} from './actionTypes';
import { getForumById, getForums } from '../../api/forumsService';

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