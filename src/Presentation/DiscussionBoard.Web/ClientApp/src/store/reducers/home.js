import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utils/updateObject';

const initialState = {
    forums: [],
    loading: false,
    error: null
};

const fetchForumsStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchForumsSuccess = ( state, action ) => {
    return updateObject( state, {
        forums: action.forums,
        loading: false,
        error: null
    } );
};

const fetchForumsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_FORUMS_START: return fetchForumsStart( state, action );
        case actionTypes.FETCH_FORUMS_SUCCESS: return fetchForumsSuccess( state, action );
        case actionTypes.FETCH_FORUMS_FAIL: return fetchForumsFail( state, action );
        default: return state;
    }
};

export default reducer;