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

export const createComment = (comment) => {
  return {
    types: [
      CREATE_COMMENT_START,
      CREATE_COMMENT_SUCCESS,
      CREATE_COMMENT_FAILURE
    ],
    callApi: () => createCommentApi(comment),
    effect({ dispatch, state, type}) {
      if (type === CREATE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a comment.`));
      }
      if (type === CREATE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a comment.'));
      }
    }
  }
};

export const updateComment = (commentId, newComment) => {
  return {
    types: [
      UPDATE_COMMENT_START,
      UPDATE_COMMENT_SUCCESS,
      UPDATE_COMMENT_FAILURE
    ],
    callApi: () => updateCommentById(commentId, newComment),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the comment.`));
      }
      if (type === UPDATE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the comment.'));
      }
    }
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
    }
  }
};

export const createVote = (vote) => {
  return {
    types: [
      CREATE_VOTE_START,
      CREATE_VOTE_SUCCESS,
      CREATE_VOTE_FAILURE
    ],
    callApi: () => createVoteApi(vote),
    effect({ dispatch, state, type}) {
      if (type === CREATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a vote.`));
      }
      if (type === CREATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a vote.'));
      }
    }
  }
};

export const updateVote = (voteId, newVote) => {
  return {
    types: [
      UPDATE_VOTE_START,
      UPDATE_VOTE_SUCCESS,
      UPDATE_VOTE_FAILURE
    ],
    callApi: () => updateVoteById(voteId, newVote),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the vote.`));
      }
      if (type === UPDATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the vote.'));
      }
    }
  }
};

export const deleteVote = (voteId) => {
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
    }
  }
};