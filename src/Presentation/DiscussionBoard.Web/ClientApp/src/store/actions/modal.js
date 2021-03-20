import {
  SHOW_MODAL,
  HIDE_MODAL
} from './actionTypes';

export const showModal = (modalType, title, message) => {
    return {
        type: SHOW_MODAL,
        // modalType: modalType,
        // title: title,
        // message: message
    };
};

export const hideModal = () => {
    return {
        type: HIDE_MODAL,
        // modalType: null,
        // title: null,
        // message: null
    };
};