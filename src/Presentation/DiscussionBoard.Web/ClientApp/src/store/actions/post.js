import * as actionTypes from './actionTypes';
import { showSnackbar } from './snackbar';
import {
  getPostById,
  createPost as apiCreatePost,
  deletePostById,
  updatePostById
} from '../../api/postsService';
import {
  createComment as apiCreateComment,
  deleteCommentById
} from '../../api/commentsService';
import {
  createVote as apiCreateVote,
  editVoteById,
  deleteVoteById
} from '../../api/votesService';

export function fetchPostById(postId) {
  return {
    types: [
      actionTypes.FETCH_POST_START,
      actionTypes.FETCH_POST_SUCCESS,
      actionTypes.FETCH_POST_FAILURE
    ],
    callAPI: () => getPostById(postId),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.FETCH_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully fetched the post with id: ${state.post.post.id}.`))
      }
      if (type === actionTypes.FETCH_POST_FAILURE) {
        dispatch(showSnackbar('error', state.post.postError))
      }
    }
  }
};

export function createPost(post) {
  return {
    types: [
      actionTypes.CREATE_POST_START,
      actionTypes.CREATE_POST_SUCCESS,
      actionTypes.CREATE_POST_FAILURE
    ],
    callAPI: () => apiCreatePost(post),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.CREATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a post.`))
      }
      if (type === actionTypes.CREATE_POST_FAILURE) {
        dispatch(showSnackbar('error', state.post.createPostError))
      }
    }
  }
};

export function updatePost(postId, newPost) {
  return {
    types: [
      actionTypes.UPDATE_POST_START,
      actionTypes.UPDATE_POST_SUCCESS,
      actionTypes.UPDATE_POST_FAILURE
    ],
    callAPI: () => updatePostById(postId, newPost),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.UPDATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the post.`))
      }
      if (type === actionTypes.UPDATE_POST_FAILURE) {
        dispatch(showSnackbar('error', state.post.updatePostError))
      }
    }
  }
};

export function deletePost(postId) {
  return {
    types: [
      actionTypes.DELETE_POST_START,
      actionTypes.DELETE_POST_SUCCESS,
      actionTypes.DELETE_POST_FAILURE
    ],
    callAPI: () => deletePostById(postId),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.DELETE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the post.`))
      }
      if (type === actionTypes.DELETE_POST_FAILURE) {
        dispatch(showSnackbar('error', state.post.deletePostError))
      }
    }
  }
};

export function createComment(comment) {
  return {
    types: [
      actionTypes.CREATE_COMMENT_START,
      actionTypes.CREATE_COMMENT_SUCCESS,
      actionTypes.CREATE_COMMENT_FAILURE
    ],
    callAPI: () => apiCreateComment(comment),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.CREATE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a comment.`))
      }
      if (type === actionTypes.CREATE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', state.post.createCommentError))
      }
    }
  }
};

export function deleteComment(commentId) {
  return {
    types: [
      actionTypes.DELETE_COMMENT_START,
      actionTypes.DELETE_COMMENT_SUCCESS,
      actionTypes.DELETE_COMMENT_FAILURE
    ],
    callAPI: () => deleteCommentById(commentId),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.DELETE_COMMENT_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted a comment.`))
      }
      if (type === actionTypes.DELETE_COMMENT_FAILURE) {
        dispatch(showSnackbar('error', state.post.deleteCommentError))
      }
    }
  }
};

export function createVote(vote) {
  return {
    types: [
      actionTypes.CREATE_VOTE_START,
      actionTypes.CREATE_VOTE_SUCCESS,
      actionTypes.CREATE_VOTE_FAILURE
    ],
    callAPI: () => apiCreateVote(vote),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.CREATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a vote.`))
      }
      if (type === actionTypes.CREATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', state.post.createVoteError))
      }
    }
  }
};

export function updateVote(voteId, newVote) {
  return {
    types: [
      actionTypes.UPDATE_VOTE_START,
      actionTypes.UPDATE_VOTE_SUCCESS,
      actionTypes.UPDATE_VOTE_FAILURE
    ],
    callAPI: () => editVoteById(voteId, newVote),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.UPDATE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated a vote.`))
      }
      if (type === actionTypes.UPDATE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', state.post.updateVoteError))
      }
    }
  }
};

export function deleteVote(voteId) {
  return {
    types: [
      actionTypes.DELETE_VOTE_START,
      actionTypes.DELETE_VOTE_SUCCESS,
      actionTypes.DELETE_VOTE_FAILURE
    ],
    callAPI: () => deleteVoteById(voteId),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.DELETE_VOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted a vote.`))
      }
      if (type === actionTypes.DELETE_VOTE_FAILURE) {
        dispatch(showSnackbar('error', state.post.deleteVoteError))
      }
    }
  }
};

// export const fetchPostByIdSuccess = (post) => {
//   return {
//     type: actionTypes.FETCH_POST_SUCCESS,
//     post: post
//   };
// };  

// export const fetchPostByIdFail = (error) => {
//   return {
//     type: actionTypes.FETCH_POST_FAILURE,
//     error: error
//   };
// };

// export const fetchPostByIdStart = () => {
//   return {
//     type: actionTypes.FETCH_POST_START
//   };
// };

// export const fetchPostById = (postId) => {
//   return dispatch => {
//     dispatch(fetchPostByIdStart());
//     getPostById(postId)
//       .then(res => dispatch(fetchPostByIdSuccess(res.data)))
//       .catch(err => dispatch(fetchPostByIdFail(err)));
//   };
// };

// export const createPostStart = () => {
//   return {
//     type: actionTypes.CREATE_POST_START
//   };
// };

// export const createPostFail = (error) => {
//   return {
//     type: actionTypes.CREATE_POST_FAILURE,
//     error: error
//   };
// };

// export const createPostSuccess = (newPost) => {
//   return {
//     type: actionTypes.CREATE_POST_SUCCESS,
//     newPost: newPost
//   };
// };

// export const createPostReset = () => {
//   return {
//     type: actionTypes.CREATE_POST_RESET
//   };
// };

// export const createPost = (newPost) => {
//   return dispatch => {
//     dispatch(createPostStart());
//     apiCreatePost(newPost)
//       .then(res => {
//         dispatch(createPostSuccess(res.data));
//         //dispatch(showSnackbar("success", "Successfully created a post."));
//       })
//       .catch(err => {
//         dispatch(createPostFail(err.message));
//         //dispatch(showSnackbar("error", error.message));
//       });
//   };
// };

// export const updatePostStart = () => {
//   return {
//     type: actionTypes.UPDATE_POST_START
//   };
// };

// export const updatePostFail = (error) => {
//   return {
//     type: actionTypes.UPDATE_POST_FAILURE,
//     error: error
//   };
// };

// export const updatePostSuccess = (updatedData) => {
//   return {
//     type: actionTypes.UPDATE_POST_SUCCESS,
//     updatedData: updatedData
//   };
// };

// export const updatePostReset = () => {
//   return {
//     type: actionTypes.UPDATE_POST_RESET
//   };
// };

// export const updatePost = (postId, updatedData) => {
//   return dispatch => {
//     dispatch(updatePostStart());
//     updatePostById(postId, updatedData)
//       .then(res =>
//       {
//         console.log(res.data)
//         dispatch(updatePostSuccess(updatedData));
//       })
//       .catch(err => dispatch(updatePostFail(err)));
//   };
// };

// export const deletePostSuccess = () => {
//   return {
//     type: actionTypes.DELETE_POST_SUCCESS
//   };
// };

// export const deletePostFail = ( error ) => {
//   return {
//     type: actionTypes.DELETE_POST_FAILURE,
//     error: error
//   };
// };

// export const deletePostStart = () => {
//   return {
//     type: actionTypes.DELETE_POST_START
//   };
// };
 
// export const deletePostReset = () => {
//   return {
//     type: actionTypes.DELETE_POST_RESET
//   };
// };

// export const deletePost = (postId) => {
//   return dispatch => {
//     dispatch(deletePostStart());
//     deletePostById(postId)
//       .then(res => dispatch(deletePostSuccess()))
//       .catch(err => dispatch(deletePostFail(err)));
//   };
// };

// export const createCommentStart = () => {
//   return {
//     type: actionTypes.CREATE_COMMENT_START
//   };
// };

// export const createCommentFail = (error) => {
//   return {
//     type: actionTypes.CREATE_COMMENT_FAILURE,
//     newCommentError: error
//   };
// };

// export const createCommentSuccess = (newComment) => {
//   return {
//     type: actionTypes.CREATE_COMMENT_SUCCESS,
//     newComment: newComment
//   };
// };

// export const createCommentReset = () => {
//   return {
//     type: actionTypes.CREATE_COMMENT_RESET
//   };
// };

// export const createComment = (newComment) => {
//   return dispatch => {
//     dispatch(createCommentStart());
//     apiCreateComment(newComment)
//       .then(res =>
//       {
//         console.log(res.data)
//         dispatch(createCommentSuccess(res.data));
//       })
//       .catch(error => dispatch(createCommentFail(error)));
//   };
// };

// export const deleteCommentStart = () => {
//   return {
//     type: actionTypes.DELETE_COMMENT_START
//   };
// };

// export const deleteCommentFail = (error) => {
//   return {
//     type: actionTypes.DELETE_COMMENT_FAILURE,
//     deleteCommentError: error
//   };
// };

// export const deleteCommentSuccess = (commentId) => {
//   return {
//     type: actionTypes.DELETE_COMMENT_SUCCESS,
//     commentId: commentId
//   };
// };

// export const deleteCommentReset = () => {
//   return {
//     type: actionTypes.DELETE_COMMENT_RESET
//   };
// };

// export const deleteComment = (commentId) => {
//   return dispatch => {
//     dispatch(deleteCommentStart());
//     deleteCommentById(commentId)
//       .then(res => dispatch(deleteCommentSuccess(commentId)))
//       .catch(error => {dispatch(deleteCommentFail(error.message))});
//   };
// };

// export const createVoteStart = () => {
//   return {
//     type: actionTypes.CREATE_VOTE_START
//   };
// };

// export const createVoteFail = (error) => {
//   return {
//     type: actionTypes.CREATE_VOTE_FAILURE,
//     createVoteError: error
//   };
// };

// export const createVoteSuccess = (newScore, commentId) => {
//   return {
//     type: actionTypes.CREATE_VOTE_SUCCESS,
//     newScore: newScore,
//     commentId: commentId
//   };
// };

// export const createVote = (newVote) => {
//   return dispatch => {
//     dispatch(createVoteStart());
//     apiCreateVote(newVote)
//       .then(res => dispatch(createVoteSuccess(res.data, newVote.commentId)))
//       .catch(error => dispatch(createVoteFail(error)));
//   };
// };

// export const updateVoteStart = () => {
//   return {
//     type: actionTypes.UPDATE_VOTE_START
//   };
// };

// export const updateVoteFail = (error) => {
//   return {
//     type: actionTypes.UPDATE_VOTE_FAILURE,
//     updateVoteError: error
//   };
// };

// export const updateVoteSuccess = (newScore, commentId) => {
//   return {
//     type: actionTypes.UPDATE_VOTE_SUCCESS,
//     newScore: newScore,
//     commentId: commentId
//   };
// };

// export const updateVote = (newVote) => {
//   return dispatch => {
//     dispatch(updateVoteStart());
//     editVoteById(newVote)
//       .then(res => dispatch(updateVoteSuccess(res.data, newVote.commentId)))
//       .catch(error => dispatch(updateVoteFail(error)));
//   };
// };

// export const deleteVoteStart = () => {
//   return {
//     type: actionTypes.DELETE_VOTE_START
//   };
// };

// export const deleteVoteFail = (error) => {
//   return {
//     type: actionTypes.DELETE_VOTE_FAILURE,
//     deleteVoteError: error
//   };
// };

// export const deleteVoteSuccess = (newScore, commentId) => {
//   return {
//     type: actionTypes.DELETE_VOTE_SUCCESS,
//     newScore: newScore,
//     commentId: commentId
//   };
// };

// export const deleteVote = (newVote) => {
//   return dispatch => {
//     dispatch(deleteVoteStart());
//     deleteVoteById(newVote)
//       .then(res => dispatch(deleteVoteSuccess(res.data, newVote.commentId)))
//       .catch(error => dispatch(deleteVoteFail(error)));
//   };
// };
