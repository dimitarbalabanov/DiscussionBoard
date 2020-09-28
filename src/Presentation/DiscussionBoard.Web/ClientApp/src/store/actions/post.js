import * as actionTypes from './actionTypes';
import { getPostById } from '../../api/postsService';
import { createComment as apiCreateComment} from '../../api/commentsService';
import { createVote as apiCreateVote} from '../../api/votesService';

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

export const createCommentSuccess = (newComment) => {
  return {
    type: actionTypes.CREATE_COMMENT_SUCCESS,
    newComment: newComment
  };
};

export const createComment = (newComment) => {
  return dispatch => {
    dispatch(createCommentStart());
    apiCreateComment(newComment)
      .then(res =>
      {
        console.log(res.data)
        dispatch(createCommentSuccess(res.data));
      })
      .catch(error => dispatch(createCommentFail(error)));
  };
};


export const createVoteStart = () => {
  return {
    type: actionTypes.CREATE_VOTE_START
  };
};

export const createVoteFail = (error) => {
  return {
    type: actionTypes.CREATE_VOTE_FAIL,
    newVoteError: error
  };
};

export const createVoteSuccess = (newScore, commentId) => {
  return {
    type: actionTypes.CREATE_VOTE_SUCCESS,
    newScore: newScore,
    commentId: commentId
  };
};

export const createVote = (newVote) => {
  return dispatch => {
    dispatch(createVoteStart());
    apiCreateVote(newVote)
      .then(res => dispatch(createVoteSuccess(res.data, newVote.commentId)))
      .catch(error => dispatch(createVoteFail(error)));
  };
};