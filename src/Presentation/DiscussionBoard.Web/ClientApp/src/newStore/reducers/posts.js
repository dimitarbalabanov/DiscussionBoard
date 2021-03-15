import {
  REQUEST_POSTS_SUCCESS,
  REQUEST_POST_SUCCESS,
  CREATE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  CREATE_SAVEDPOST_SUCCESS,
  DELETE_SAVEDPOST_SUCCESS,
  CREATE_POSTVOTE_SUCCESS,
  UPDATE_POSTVOTE_SUCCESS,
  DELETE_POSTVOTE_SUCCESS,
} from '../actions/actionTypes';

  //          byId :{
  //           "post1" : {
  //               id : "post1",
  //               author : "user1",
  //               body : "......",
  //               comments : ["comment1", "comment2"]
  //           },
  //           "post2" : {
  //               id : "post2",
  //               author : "user2",
  //               body : "......",
  //               comments : ["comment3", "comment4", "comment5"]
  //           }
  //       },
  //       allIds : ["post1", "post2"]

function postsById(state = {}, action) {
  switch (action.type) {

    case 'ADD_COMMENT':
      const { payload } = action
      const { postId, commentId } = payload

      const post = state[postId]

      return {
        ...state,
        [postId]: {
          ...post,
          comments: post.comments.concat(commentId)
        }
      };

    case REQUEST_POST_SUCCESS:
      const post = action.data;

      return {
        ...state,
        [post.id]: post
      }
    
      case REQUEST_POSTS_SUCCESS:
      const posts = action.data.data.posts
      .map(x => { x.id = x})
      let transformedPosts = {};
      posts.forEach(post => {
        transformedPosts[post.id] = post
      });

      console.log(posts)
      return { 
        ...state,
        ...transformedPosts
      };

      case CREATE_POST_SUCCESS:

      return {
        ...state,
        createPostSuccess: true,
        createPostLoading: false,
        createPostError: null,
        post: action.data
      };


    case UPDATE_POST_SUCCESS:
      const postId = action.postId;
      const newPost = action.newPost;
      const res = action.data;

      return { 
        ...state,
        [postId] : {
          ...state.postId,
          ...newPost,
          ...res
        }
      };

    case DELETE_POST_SUCCESS: 
      const postId = action.postId;

      return { 
        ...state,
        [postId]: null
      };

    case CREATE_SAVEDPOST_SUCCESS:
      const postId = action.postId;

      return { 
        ...state,
        [postId]: {
          ...state.postId,
          isSaved: true
        }
      };

    case DELETE_SAVEDPOST_SUCCESS: 
      const postId = action.postId;

      return { 
        ...state,
        [postId]: {
          ...state.postId,
          isSaved: false
        }
      };

    case CREATE_POSTVOTE_SUCCESS:
      const postId = action.postId;

      return { 
        ...state,
        [postId]: {
          ...state.postId,
          votesScore: action.voteType === 'up' ? state.postId.votesScore + 1 : state.postId.votesScore - 1,
          voteId: action.data,
          voteType: action.voteType
        }
      };

    case UPDATE_POSTVOTE_SUCCESS:
      const postId = action.postId;

      return { 
        ...state,
        [postId]: {
          ...state.postId,
          votesScore: action.voteType === 'up' ? state.postId.votesScore + 2 : state.postId.votesScore - 2,
          voteType: action.voteType
        }
      };

    case DELETE_POSTVOTE_SUCCESS:
      const postId = action.postId;

      return {
        ...state,
        postId: {
          ...state.postId,
          votesScore: action.voteType === 'up' ? state.postId.votesScore - 1 : state.postId.votesScore + 1,
          voteType: null,
          voteId: null
        }
      };


    default:
      return state
  }
}

function allPosts(state = [], action) {
  switch (action.type) {
    case REQUEST_POST_SUCCESS:
      return state.concat(action.data.id);

    case REQUEST_POSTS_SUCCESS:
      return state.concat(action.data.data.posts.map(x => x.id));

    case DELETE_POST_SUCCESS: 
      return state.filter(id => id !== action.postId);

    default:
      return state
  }
}

export const postsReducer = combineReducers({
  byId: postsById,
  allIds: allPosts
})