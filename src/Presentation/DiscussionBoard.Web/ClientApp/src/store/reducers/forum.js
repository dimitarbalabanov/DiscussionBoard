import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialForumState = {
  forum: null,
  loading: false,
  error: null
};

const initialCreatePostState = {
  newPostId: null,
  newPostLoading: false,
  newPostError: null
}

const initialState = {
  ...initialForumState,
  ...initialCreatePostState
};

const fetchForumByIdStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchForumByIdSuccess = ( state, action ) => {
    return updateObject( state, {
        forum: action.forum,
        loading: false,
        error: null
    } );
};

const fetchForumByIdFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const createPostStart = (state, action) => {
  return updateObject(state, { newPostError: null, newPostLoading: true });
};

const createPostSuccess = (state, action) => {
  return updateObject(state, {
    newPostId: action.newPostId,
    newPostLoading: false,
    newPostError: null
  });
};

const createPostFail = (state, action) => {
  return updateObject(state, { newPostError: action.newPostError, newPostLoading: false });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FORUM_START: return fetchForumByIdStart( state, action );
        case actionTypes.FETCH_FORUM_SUCCESS: return fetchForumByIdSuccess( state, action );
        case actionTypes.FETCH_FORUM_FAIL: return fetchForumByIdFail( state, action );
        case actionTypes.CREATE_POST_START: return createPostStart(state, action);
        case actionTypes.CREATE_POST_SUCCESS: return createPostSuccess(state, action);
        case actionTypes.CREATE_POST_FAIL: return createPostFail(state, action);
        default: return state;
    }
};

export default reducer;