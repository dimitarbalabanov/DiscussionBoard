import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
    forum: null,
    loading: false,
    error: null
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

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FORUM_START: return fetchForumByIdStart( state, action );
        case actionTypes.FETCH_FORUM_SUCCESS: return fetchForumByIdSuccess( state, action );
        case actionTypes.FETCH_FORUM_FAIL: return fetchForumByIdFail( state, action );
        default: return state;
    }
};

export default reducer;