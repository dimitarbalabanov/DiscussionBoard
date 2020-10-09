import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR
} from '../actions/actionTypes';

const initialState = {
  show: false,
  type: '',
  message: ''
};

const showSnackbar = (state, action) => {
  return {
    show: true,
    type: action.snackbarType,
    message: action.message
  };
};

const hideSnackbar = (state, action) => {
  return initialState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SHOW_SNACKBAR: return showSnackbar(state, action);
      case HIDE_SNACKBAR: return hideSnackbar(state, action);
      default: return state;
  }
};

export default reducer;