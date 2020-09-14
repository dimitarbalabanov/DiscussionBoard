import * as actionTypes from './actionTypes';
import { getForumById } from '../../api/forumsService';
import { createPost as apiCreatePost } from '../../api/postsService';

export const fetchForumByIdSuccess = ( forum ) => {
    return {
        type: actionTypes.FETCH_FORUM_SUCCESS,
        forum: forum
    };
};

export const fetchForumByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FORUM_FAIL,
        error: error
    };
};

export const fetchForumByIdStart = () => {
    return {
        type: actionTypes.FETCH_FORUM_START
    };
};

export const fetchForumById = (forumId) => {
  return dispatch => {
    dispatch(fetchForumByIdStart());
    getForumById(forumId)
      .then(res => dispatch(fetchForumByIdSuccess(res.data)))
      .catch(err => dispatch(fetchForumByIdFail(err)));
    };
};

export const createPostStart = () => {
  return {
    type: actionTypes.CREATE_POST_START
  };
};

export const createPostFail = (error) => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    newPostError: error
  };
};

export const createPostSuccess = (newPostId) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    newPostId: newPostId
  };
};

export const createPost = (newPost) => {
  return dispatch => {
    dispatch(createPostStart());
    apiCreatePost(newPost)
      .then(res => dispatch(createPostSuccess(res.data)))
      .catch(error => dispatch(createPostFail(error)));
  };
};