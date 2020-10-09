import * as actionTypes from './actionTypes';
//import { showSnackbar } from './snackbar';
import { getAllForums } from '../../api/forumsService';
import { getAllPosts } from '../../api/postsService';

export const fetchForumsSuccess = (forums) => {
  return {
    type: actionTypes.FETCH_FORUMS_SUCCESS,
    forums: forums
  };
};

export const fetchForumsFail = (error) => {
  return {
    type: actionTypes.FETCH_FORUMS_FAIL,
    error: error
  };
};

export const fetchForumsStart = () => {
  return {
    type: actionTypes.FETCH_FORUMS_START
  };
};

export const fetchForums = () => {
  return dispatch => {
    dispatch(fetchForumsStart());
    getAllForums()
      .then(res => {
        console.log(res)
        dispatch(fetchForumsSuccess(res.data.forums))
      })
      .catch( err => { 
        dispatch(fetchForumsFail(err.message));
        //dispatch(showSnackbar("error", err.message));
      });
  };
};

export const fetchPostsSuccess = (posts) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts
  };
};

export const fetchPostsFail = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error
  };
};

export const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  };
};

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart());
    getAllPosts()
      .then(res => dispatch(fetchPostsSuccess(res.data.posts)))
      .catch( err => { 
        dispatch(fetchPostsFail(err.message));
        //dispatch(showSnackbar("error", err.message));
      });
  };
};