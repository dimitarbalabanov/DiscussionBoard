import * as actionTypes from './actionTypes';
import { getPostById } from '../../api/postsService';
import { createComment as apiCreateComment} from '../../api/commentsService';

export const fetchPostByIdSuccess = ( post ) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        post: post
    };
};

export const fetchPostByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        error: error
    };
};

export const fetchPostByIdStart = () => {
    return {
        type: actionTypes.FETCH_POST_START
    };
};

export const fetchPostById = (postId) => {
    return dispatch => {
        dispatch(fetchPostByIdStart());
        getPostById(postId)
            .then( res => 
                dispatch(fetchPostByIdSuccess(res.data))
             )
            .catch( err => {
                dispatch(fetchPostByIdFail(err));
            } );
    };
};

export const createCommentStart = () => {
  return {
    type: actionTypes.CREATE_COMMENT_START
  };
};

export const createCommentFail = (error) => {
  return {
    type: actionTypes.CREATE_COMMENT_FAIL,
    newCommentError: error
  };
};

export const createCommentSuccess = (newCommentId) => {
  return {
    type: actionTypes.CREATE_COMMENT_SUCCESS,
    newCommentId: newCommentId
  };
};

export const createComment = (newComment) => {
  return dispatch => {
    dispatch(createCommentStart());
    apiCreateComment(newComment)
      .then(res =>
        {
          dispatch(createCommentSuccess(res.data));
          dispatch(fetchPostById(res.data));
        })
      .catch(error => dispatch(createCommentFail(error)));
  };
};