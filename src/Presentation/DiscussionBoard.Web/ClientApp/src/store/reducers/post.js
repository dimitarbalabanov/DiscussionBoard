import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
    post: null,
    loading: false,
    error: null
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_POST_START: return fetchPostByIdStart( state, action );
        case actionTypes.FETCH_POST_SUCCESS: return fetchPostByIdSuccess( state, action );
        case actionTypes.FETCH_POST_FAIL: return fetchPostByIdFail( state, action );
        default: return state;
    }
};

export default reducer;