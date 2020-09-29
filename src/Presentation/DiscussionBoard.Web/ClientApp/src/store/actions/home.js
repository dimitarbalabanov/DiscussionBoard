import * as actionTypes from './actionTypes';
import { getAllForums } from '../../api/forumsService';

export const fetchForumsSuccess = ( forums ) => {
    return {
        type: actionTypes.FETCH_FORUMS_SUCCESS,
        forums: forums
    };
};

export const fetchForumsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FORUMS_FAIL,
        error: error
    };
};

export const fetchForumsStart = () => {
    return {
        type: actionTypes.FETCH_FORUMS_START
    };
};

export const fetchForums = () => {
    return dispatch => {
        dispatch(fetchForumsStart());
        getAllForums()
            .then( res => 
                dispatch(fetchForumsSuccess(res.data.forums))
             )
            .catch( err => {
                dispatch(fetchForumsFail(err.message));
            } );
    };
};