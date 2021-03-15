import {
  CLEAR_COMMENTS,
  SET_COMMENTS_SORT,
  SET_COMMENTS_TOP,
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
  CREATE_COMMENTVOTE_START,
  CREATE_COMMENTVOTE_SUCCESS,
  CREATE_COMMENTVOTE_FAILURE,
  UPDATE_COMMENTVOTE_START,
  UPDATE_COMMENTVOTE_SUCCESS,
  UPDATE_COMMENTVOTE_FAILURE,
  DELETE_COMMENTVOTE_START,
  DELETE_COMMENTVOTE_SUCCESS,
  DELETE_COMMENTVOTE_FAILURE
} from './actionTypes';
import {
  getComments,
  createComment as createCommentApi,
  updateCommentById,
  deleteCommentById
} from '../../api/commentsService';
import {
  createCommentVote as createCommentVoteApi,
  updateCommentVoteById,
  deleteCommentVoteById
} from '../../api/commentVotesService';
import { showSnackbar } from './snackbar';

export const setCommentsSort = (postId, commentIds, sort) => {
  
  return {
    type: SET_COMMENTS_SORT,
    sort: sort,
    postId: postId,
    commentIds: commentIds
  };
};

export const setCommentsTop = (top) => {
  return {
    type: SET_COMMENTS_TOP,
    top: top
  };
};

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  }
}

export const fetchComments = (postId) => {
  return {
    types: [
      REQUEST_COMMENTS_START,
      REQUEST_COMMENTS_SUCCESS,
      REQUEST_COMMENTS_FAILURE
    ],
    callApi: () => getComments(postId),
    effect() { },
    postId: postId
  }
};

export const createComment = (content, postId, username) => {
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
    content: content,
    postId: postId,
    username: username
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

export const deleteComment = (commentId, postId) => {
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
    commentId: commentId,
    postId: postId
  }
};

export const createCommentVote = (commentId, voteType) => {
  return {
    types: [
      CREATE_COMMENTVOTE_START,
      CREATE_COMMENTVOTE_SUCCESS,
      CREATE_COMMENTVOTE_FAILURE
    ],
    callApi: () => createCommentVoteApi(commentId, voteType),
    effect({ dispatch, state, type}) {
      if (type === CREATE_COMMENTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a comment vote.`));
      }
      if (type === CREATE_COMMENTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a comment vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};

export const updateCommentVote = (commentId, commentVoteId, voteType) => {
  return {
    types: [
      UPDATE_COMMENTVOTE_START,
      UPDATE_COMMENTVOTE_SUCCESS,
      UPDATE_COMMENTVOTE_FAILURE
    ],
    callApi: () => updateCommentVoteById(commentVoteId, voteType),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_COMMENTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the comment vote.`));
      }
      if (type === UPDATE_COMMENTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the comment vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};

export const deleteCommentVote = (commentId, commentVoteId, voteType) => {
  return {
    types: [
      DELETE_COMMENTVOTE_START,
      DELETE_COMMENTVOTE_SUCCESS,
      DELETE_COMMENTVOTE_FAILURE
    ],
    callApi: () => deleteCommentVoteById(commentVoteId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_COMMENTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the comment vote.`));
      }
      if (type === DELETE_COMMENTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error deleting the comment vote.'));
      }
    },
    commentId: commentId,
    voteType: voteType
  }
};