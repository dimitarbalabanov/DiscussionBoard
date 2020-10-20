import {
  REQUEST_COMMENTS_START,
  REQUEST_COMMENTS_SUCCESS,
  REQUEST_COMMENTS_FAILURE,
  CREATE_COMMENT_START,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  UPDATE_COMMENT_START,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  CREATE_VOTE_START,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,
  UPDATE_VOTE_START,
  UPDATE_VOTE_SUCCESS,
  UPDATE_VOTE_FAILURE,
  DELETE_VOTE_START,
  DELETE_VOTE_SUCCESS,
  DELETE_VOTE_FAILURE
} from './actionTypes';
import {
  getComments,
  createComment as createCommentApi,
  updateCommentById,
  deleteCommentById
} from '../../api/commentsService';
import {
  createVote as createVoteApi,
  updateVoteById,
  deleteVoteById
} from '../../api/votesService';
import { showSnackbar } from './snackbar';

export const fetchComments = (postId) => {
  return {
    types: [
      REQUEST_COMMENTS_START,
      REQUEST_COMMENTS_SUCCESS,
      REQUEST_COMMENTS_FAILURE
    ],
    callApi: () => getComments(postId),
    effect({ dispatch, state, type}) {
      if (type === REQUEST_COMMENTS_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully fetched the comments.`));
      }
      if (type === REQUEST_COMMENTS_FAILURE) {
        dispatch(showSnackbar('error', 'Error fetching the forums.'));
      }
    }
  }
};

export const createComment = (content, postId) => {
  return {
    types: [
      CREATE_COMMENT_START,
      CREATE_COMMENT_SUCCESS,
      CREATE_COMMENT_FAILURE
    ],
    callApi: () => createCommentApi(content, postId),
    effect({ dispatch, state, type}) {
      if (type === CREATE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a comment.`));
      }
      if (type === CREATE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a comment.'));
      }
    },
    content: content
  }
};

export const updateComment = (commentId, content) => {
  return {
    types: [
      UPDATE_COMMENT_START,
      UPDATE_COMMENT_SUCCESS,
      UPDATE_COMMENT_FAILURE
    ],
    callApi: () => updateCommentById(commentId, content),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the comment.`));
      }
      if (type === UPDATE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the comment.'));
      }
    },
    commentId: commentId,
    content: content
  }
};

export const deleteComment = (commentId) => {
  return {
    types: [
      DELETE_COMMENT_START,
      DELETE_COMMENT_SUCCESS,
      DELETE_COMMENT_FAILURE
    ],
    callApi: () => deleteCommentById(commentId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the comment.`));
      }
      if (type === DELETE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', 'Error deleting the comment.'));
      }
    },
    commentId: commentId
  }
};

export const createVote = (commentId, voteType) => {
  return {
    types: [
      CREATE_VOTE_START,
      CREATE_VOTE_SUCCESS,
      CREATE_VOTE_FAILURE
    ],
    callApi: () => createVoteApi(commentId, voteType),
    effect({ dispatch, state, type}) {
      if (type === CREATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a vote.`));
      }
      if (type === CREATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};

export const updateVote = (commentId, voteId, voteType) => {
  return {
    types: [
      UPDATE_VOTE_START,
      UPDATE_VOTE_SUCCESS,
      UPDATE_VOTE_FAILURE
    ],
    callApi: () => updateVoteById(voteId, voteType),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the vote.`));
      }
      if (type === UPDATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};

export const deleteVote = (commentId, voteId, voteType) => {
  return {
    types: [
      DELETE_VOTE_START,
      DELETE_VOTE_SUCCESS,
      DELETE_VOTE_FAILURE
    ],
    callApi: () => deleteVoteById(voteId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the vote.`));
      }
      if (type === DELETE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error deleting the vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};