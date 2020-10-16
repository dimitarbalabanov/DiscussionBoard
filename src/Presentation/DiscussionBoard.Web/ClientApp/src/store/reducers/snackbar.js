import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../actions/actionTypes';

const initialState = {
  show: false,
  type: '',
  message: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SHOW_SNACKBAR: 
      return {
        show: true,
        type: action.snackbarType,
        message: action.message
      };

    case HIDE_SNACKBAR: 
      return {
        ...state,
        show: false,
        message: null
      };

    default:
      return state;
  }
};

export default reducer;