import {
  REQUEST_POSTS_SUCCESS,
  REQUEST_POSTS_START,
  REQUEST_POSTS_FAILURE,
  SET_POST_SORT,
  SET_POST_TOP,
  REQUEST_POST_START,
  REQUEST_POST_SUCCESS,
  REQUEST_POST_FAILURE,
  CREATE_POST_START,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_RESET,
  UPDATE_POST_START,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CREATE_POSTVOTE_START,
  CREATE_POSTVOTE_SUCCESS,
  CREATE_POSTVOTE_FAILURE,
  UPDATE_POSTVOTE_START,
  UPDATE_POSTVOTE_SUCCESS,
  UPDATE_POSTVOTE_FAILURE,
  DELETE_POSTVOTE_START,
  DELETE_POSTVOTE_SUCCESS,
  DELETE_POSTVOTE_FAILURE,
  CREATE_SAVEDPOST_START,
  CREATE_SAVEDPOST_SUCCESS,
  CREATE_SAVEDPOST_FAILURE,
  DELETE_SAVEDPOST_START,
  DELETE_SAVEDPOST_SUCCESS,
  DELETE_SAVEDPOST_FAILURE
} from './actionTypes';
import { 
  showSnackbar 
} from './snackbar';
import {
  getPosts,
  getPostById,
  createPost as createPostApi,
  updatePostById,
  deletePostById
} from '../../api/postsService';
import {
  createPostVote as createPostVoteApi,
  updatePostVoteById,
  deletePostVoteById
} from '../../api/postVotesService';
import {
  createSavedPost as createSavedPostApi,
  deleteSavedPostByPostId
} from '../../api/savedPostsService';

export const fetchPosts = (sort, top, forumId, cursor) => {
  return {
    types: [
      REQUEST_POSTS_START,
      REQUEST_POSTS_SUCCESS,
      REQUEST_POSTS_FAILURE
    ],
    callApi: () => getPosts(sort, top, forumId, cursor),
    effect({ dispatch, state, type}) {
      if (type === REQUEST_POSTS_FAILURE) {
        console.log(state)
      }
    },
    forumId: forumId,
    sort: sort
  }
}

  export const setPostSort = (postId, sort) => {
    return {
      type: SET_POST_SORT,
      sort: sort,
      postId: postId
    };
  };
  
  export const setPostTop = (postId, top) => {
    return {
      type: SET_POST_TOP,
      top: top,
      postId: postId
    };
  };

export const fetchPostById = (postId) => {
  return {
    types: [
      REQUEST_POST_START,
      REQUEST_POST_SUCCESS,
      REQUEST_POST_FAILURE
    ],
    callApi: () => getPostById(postId),
    effect() { }
  }
};

//export const createPost = (forumId, title, content) => {
  export const createPost = (formData) => {
    return {
      types: [
      CREATE_POST_START,
      CREATE_POST_SUCCESS,
      CREATE_POST_FAILURE
    ],
    //callApi: () => createPostApi(forumId, title, content),
    callApi: () => createPostApi(formData),
    effect({ dispatch, state, type}) {
      if (type === CREATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a post.`))
      }
      if (type === CREATE_POST_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a post.'))
      }
    }
  }
};

export const createPostReset = () => {
  return {
    type: CREATE_POST_RESET
  };
};

export const updatePost = (postId, title, content) => {
  return {
    types: [
      UPDATE_POST_START,
      UPDATE_POST_SUCCESS,
      UPDATE_POST_FAILURE
    ],
    callApi: () => updatePostById(postId, title, content),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the post with ${postId}.`))
      }
      if (type === UPDATE_POST_FAILURE) {
        dispatch(showSnackbar('error', `Error updating the post with ${postId}.`))
      }
    },
    postId: postId,
    title: title,
    content: content
  }
};

export const deletePost = (postId) => {
  return {
    types: [
      DELETE_POST_START,
      DELETE_POST_SUCCESS,
      DELETE_POST_FAILURE
    ],
    callApi: () => deletePostById(postId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_POST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the post with ${postId}.`))
      }
      if (type === DELETE_POST_FAILURE) {
        dispatch(showSnackbar('error', `Error deleting the post with ${postId}.`))
      }
    },
    postId: postId
  }
};

export const createPostVote = (postId, voteType) => {
  return {
    types: [
      CREATE_POSTVOTE_START,
      CREATE_POSTVOTE_SUCCESS,
      CREATE_POSTVOTE_FAILURE
    ],
    callApi: () => createPostVoteApi(postId, voteType),
    effect({ dispatch, state, type}) {
      if (type === CREATE_POSTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully created a post vote.`));
      }
      if (type === CREATE_POSTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error creating a post vote.'));
      }
    },
    postId: postId,
    voteType: voteType
  }
};

export const updatePostVote = (postId, postVoteId, voteType) => {
  return {
    types: [
      UPDATE_POSTVOTE_START,
      UPDATE_POSTVOTE_SUCCESS,
      UPDATE_POSTVOTE_FAILURE
    ],
    callApi: () => updatePostVoteById(postVoteId, voteType),
    effect({ dispatch, state, type}) {
      if (type === UPDATE_POSTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully updated the post vote.`));
      }
      if (type === UPDATE_POSTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error updating the post vote.'));
      }
    },
    postId: postId,
    voteType: voteType
  }
};

export const deletePostVote = (postId, postVoteId, voteType) => {
  return {
    types: [
      DELETE_POSTVOTE_START,
      DELETE_POSTVOTE_SUCCESS,
      DELETE_POSTVOTE_FAILURE
    ],
    callApi: () => deletePostVoteById(postVoteId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_POSTVOTE_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the post vote.`));
      }
      if (type === DELETE_POSTVOTE_FAILURE) {
        dispatch(showSnackbar('error', 'Error deleting the post vote.'));
      }
    },
    postId: postId,
    voteType: voteType
  }
};

export const createSavedPost = (postId) => {
  return {
    types: [
      CREATE_SAVEDPOST_START,
      CREATE_SAVEDPOST_SUCCESS,
      CREATE_SAVEDPOST_FAILURE
    ],
    callApi: () => createSavedPostApi(postId),
    effect({ dispatch, state, type}) {
      if (type === CREATE_SAVEDPOST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully saved a post with ${postId}.`));
      }
      if (type === CREATE_SAVEDPOST_FAILURE) {
        dispatch(showSnackbar('error', `Error saving a post with ${postId}.`));
      }
    },
    postId: postId
  }
};

export const deleteSavedPost = (postId) => {
  return {
    types: [
      DELETE_SAVEDPOST_START,
      DELETE_SAVEDPOST_SUCCESS,
      DELETE_SAVEDPOST_FAILURE
    ],
    callApi: () => deleteSavedPostByPostId(postId),
    effect({ dispatch, state, type}) {
      if (type === DELETE_SAVEDPOST_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully deleted the saved post.`));
      }
      if (type === DELETE_SAVEDPOST_FAILURE) {
        dispatch(showSnackbar('error', 'Error deleting the saved post.'));
      }
    },
    postId: postId
  }
};