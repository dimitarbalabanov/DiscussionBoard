import * as actionTypes from './actionTypes';

export const showSnackbar = (snackbarType, message) => {
    return {
        type: actionTypes.SHOW_SNACKBAR,
        snackbarType: snackbarType,
        message: message
    };
};

export const hideSnackbar = () => {
    return {
        type: actionTypes.HIDE_SNACKBAR,
        message: null
    };
};