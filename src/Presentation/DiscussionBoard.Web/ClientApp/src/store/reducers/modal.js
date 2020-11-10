import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/actionTypes';

const initialState = {
  show: false,
  type: null,
  title: null,
  message: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SHOW_MODAL: 
      return {
        show: true,
        type: action.modalType,
        title: action.title,
        message: action.message
      };

    case HIDE_MODAL: 
      return {
        ...state,
        show: false,
        type: null,
        title: null,
        message: null
      };

    default:
      return state;
  }
};

export default reducer;