import * as actionTypes from './actionTypes';
import { getPostById } from '../../api/postsService';

export const fetchPostByIdSuccess = ( post ) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        post: post
    };
};

export const fetchPostByIdFail = ( error ) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        error: error
    };
};

export const fetchPostByIdStart = () => {
    return {
        type: actionTypes.FETCH_POST_START
    };
};

export const fetchPostById = (postId) => {
    return dispatch => {
        dispatch(fetchPostByIdStart());
        getPostById(postId)
            .then( res => 
                dispatch(fetchPostByIdSuccess(res.data))
             )
            .catch( err => {
                dispatch(fetchPostByIdFail(err));
            } );
    };
};