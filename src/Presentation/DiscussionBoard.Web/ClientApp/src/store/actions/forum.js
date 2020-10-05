import * as actionTypes from './actionTypes';
import { getForumById } from '../../api/forumsService';
//import { showSnackbar } from './snackbar';
import { createPost as apiCreatePost } from '../../api/postsService';

export const fetchForumByIdSuccess = (forum) => {
  return {
    type: actionTypes.FETCH_FORUM_SUCCESS,
    forum: forum
  };
};

export const fetchForumByIdFail = (error) => {
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
      .catch(err => { 
        dispatch(fetchForumByIdFail(err));
        //dispatch(showSnackbar("error", err.message));
      });
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
    error: error
  };
};

export const createPostSuccess = (newPost) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    newPost: newPost
  };
};

export const createPostReset = () => {
  return {
    type: actionTypes.CREATE_POST_RESET
  };
};

export const createPost = (newPost) => {
  return dispatch => {
    dispatch(createPostStart());
    apiCreatePost(newPost)
      .then(res => {
        dispatch(createPostSuccess(res.data));
        //dispatch(showSnackbar("success", "Successfully created a post."));
      })
      .catch(err => {
        dispatch(createPostFail(err.message));
        //dispatch(showSnackbar("error", error.message));
      });
  };
};