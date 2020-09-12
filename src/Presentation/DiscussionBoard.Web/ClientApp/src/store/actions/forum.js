import * as actionTypes from './actionTypes';
import { getForumById } from '../../api/forumsService';

export const fetchForumByIdSuccess = ( forum ) => {
    return {
        type: actionTypes.FETCH_FORUM_SUCCESS,
        forum: forum
    };
};

export const fetchForumByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FORUM_FAIL,
        error: error
    };
};

export const fetchForumByIdStart = () => {
    return {
        type: actionTypes.FETCH_FORUM_START
    };
};

export const fetchForumById = (forumId) => {
    return dispatch => {
        dispatch(fetchForumByIdStart());
        getForumById(forumId)
            .then( res => 
                dispatch(fetchForumByIdSuccess(res.data))
             )
            .catch( err => {
                dispatch(fetchForumByIdFail(err));
            } );
    };
};