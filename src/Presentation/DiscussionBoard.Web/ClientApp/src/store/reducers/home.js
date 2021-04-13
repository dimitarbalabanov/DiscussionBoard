import {
  REQUEST_POSTS_SUCCESS,
  SET_HOME_SORT,
  SET_HOME_TOP,
} from '../actions/actionTypes';

const initialHomeState = {
  postIds: [],
  sort: 1,
  top: '',
  cursor: null
};

const requestPostsSuccess = (state, action) => {
  if (action.forumId !== null) {
    return state;
  }

  const posts = action.data.posts;
  const postIds = posts.map(x => x.id);
  let cursor = null;
  if (posts.length == 10) {
    const lastPost = posts[posts.length - 1];
    cursor = action.sort !== 3 
    ? btoa(lastPost.id + '#' + lastPost.createdOn)
    : btoa(lastPost.id + '#' + lastPost.createdOn + '#' + lastPost.votesScore);
  }

  return {
    ...state,
    postIds: state.postIds.concat(postIds),
    cursor: cursor
  }
}

const setHomeSort = (state, action) => {
  const { sort } = action;
  return {
    ...state,
    sort: sort,
    postIds: [],
    cursor: null
  }
}

const setHomeTop = (state, action) => {
  const { top } = action;
  return {
    ...state,
    top: top,
    postIds: [],
    cursor: null
  }
}

const reducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case REQUEST_POSTS_SUCCESS:
      return requestPostsSuccess(state, action);
    case SET_HOME_SORT:
      return setHomeSort(state, action);
    case SET_HOME_TOP:
      return setHomeTop(state, action);
    default:
      return state
  }
}

export default reducer;