import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialPostState = {
    post: null,
    loading: false,
    error: null
};

const initialCreateCommentState = {
  newCommentId: null,
  newCommentLoading: false,
  newCommentError: null
}

const initialState = {
  ...initialPostState,
  ...initialCreateCommentState
};

const fetchPostByIdStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchPostByIdSuccess = ( state, action ) => {
    return updateObject( state, {
        post: action.post,
        loading: false,
        error: null
    } );
};

const fetchPostByIdFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const createCommentStart = (state, action) => {
  return updateObject(state, { newCommentError: null, newCommentLoading: true });
};

const createCommentSuccess = (state, action) => {
  return updateObject(state, {
    newCommentId: action.newCommentId,
    newCommentLoading: false,
    newCommentError: null
  });
};

const createCommentFail = (state, action) => {
  return updateObject(state, { newCommentError: action.newCommentError, newCommentLoading: false });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_POST_START: return fetchPostByIdStart( state, action );
        case actionTypes.FETCH_POST_SUCCESS: return fetchPostByIdSuccess( state, action );
        case actionTypes.FETCH_POST_FAIL: return fetchPostByIdFail( state, action );
        case actionTypes.CREATE_COMMENT_START: return createCommentStart(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS: return createCommentSuccess(state, action);
        case actionTypes.CREATE_COMMENT_FAIL: return createCommentFail(state, action);
        default: return state;
    }
};

export default reducer;