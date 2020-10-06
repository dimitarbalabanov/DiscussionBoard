import * as actionTypes from './actionTypes';
import { getPostById, deletePostById, updatePostById } from '../../api/postsService';
import { createComment as apiCreateComment, deleteCommentById} from '../../api/commentsService';
import { createVote as apiCreateVote, editVoteById, deleteVoteById} from '../../api/votesService';

export const fetchPostByIdSuccess = (post) => {
  return {
    type: actionTypes.FETCH_POST_SUCCESS,
    post: post
  };
};  

export const fetchPostByIdFail = (error) => {
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
      .then(res => dispatch(fetchPostByIdSuccess(res.data)))
      .catch(err => dispatch(fetchPostByIdFail(err)));
  };
};

export const updatePostStart = () => {
  return {
    type: actionTypes.UPDATE_POST_START
  };
};

export const updatePostFail = (error) => {
  return {
    type: actionTypes.UPDATE_POST_FAIL,
    error: error
  };
};

export const updatePostSuccess = (updatedData) => {
  return {
    type: actionTypes.UPDATE_POST_SUCCESS,
    updatedData: updatedData
  };
};

export const updatePostReset = () => {
  return {
    type: actionTypes.UPDATE_POST_RESET
  };
};

export const updatePost = (postId, updatedData) => {
  return dispatch => {
    dispatch(updatePostStart());
    updatePostById(postId, updatedData)
      .then(res =>
      {
        console.log(res.data)
        dispatch(updatePostSuccess(updatedData));
      })
      .catch(err => dispatch(updatePostFail(err)));
  };
};


export const deletePostSuccess = () => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS
  };
};

export const deletePostFail = ( error ) => {
  return {
    type: actionTypes.DELETE_POST_FAIL,
    error: error
  };
};

export const deletePostStart = () => {
  return {
    type: actionTypes.DELETE_POST_START
  };
};
 
export const deletePostReset = () => {
  return {
    type: actionTypes.DELETE_POST_RESET
  };
};

export const deletePost = (postId) => {
  return dispatch => {
    dispatch(deletePostStart());
    deletePostById(postId)
      .then(res => dispatch(deletePostSuccess()))
      .catch(err => dispatch(deletePostFail(err)));
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

export const createCommentReset = () => {
  return {
    type: actionTypes.CREATE_COMMENT_RESET
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

export const deleteCommentStart = () => {
  return {
    type: actionTypes.DELETE_COMMENT_START
  };
};

export const deleteCommentFail = (error) => {
  return {
    type: actionTypes.DELETE_COMMENT_FAIL,
    deleteCommentError: error
  };
};

export const deleteCommentSuccess = (commentId) => {
  return {
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    commentId: commentId
  };
};

export const deleteCommentReset = () => {
  return {
    type: actionTypes.DELETE_COMMENT_RESET
  };
};

export const deleteComment = (commentId) => {
  return dispatch => {
    dispatch(deleteCommentStart());
    deleteCommentById(commentId)
      .then(res => dispatch(deleteCommentSuccess(commentId)))
      .catch(error => {dispatch(deleteCommentFail(error.message))});
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
    createVoteError: error
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

export const updateVoteStart = () => {
  return {
    type: actionTypes.UPDATE_VOTE_START
  };
};

export const updateVoteFail = (error) => {
  return {
    type: actionTypes.UPDATE_VOTE_FAIL,
    updateVoteError: error
  };
};

export const updateVoteSuccess = (newScore, commentId) => {
  return {
    type: actionTypes.UPDATE_VOTE_SUCCESS,
    newScore: newScore,
    commentId: commentId
  };
};

export const updateVote = (newVote) => {
  return dispatch => {
    dispatch(updateVoteStart());
    editVoteById(newVote)
      .then(res => dispatch(updateVoteSuccess(res.data, newVote.commentId)))
      .catch(error => dispatch(updateVoteFail(error)));
  };
};


export const deleteVoteStart = () => {
  return {
    type: actionTypes.DELETE_VOTE_START
  };
};

export const deleteVoteFail = (error) => {
  return {
    type: actionTypes.DELETE_VOTE_FAIL,
    deleteVoteError: error
  };
};

export const deleteVoteSuccess = (newScore, commentId) => {
  return {
    type: actionTypes.DELETE_VOTE_SUCCESS,
    newScore: newScore,
    commentId: commentId
  };
};

export const deleteVote = (newVote) => {
  return dispatch => {
    dispatch(deleteVoteStart());
    deleteVoteById(newVote)
      .then(res => dispatch(deleteVoteSuccess(res.data, newVote.commentId)))
      .catch(error => dispatch(deleteVoteFail(error)));
  };
};