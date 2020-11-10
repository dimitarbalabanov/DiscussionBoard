import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from './actionTypes';

export const showSnackbar = (snackbarType, message) => {
    return {
        type: SHOW_SNACKBAR,
        snackbarType: snackbarType,
        message: message
    };
};

export const hideSnackbar = () => {
    return {
        type: HIDE_SNACKBAR,
        message: null
    };
};