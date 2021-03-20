import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../../actions/actionTypes';

const initialState = {
  show: false,
  type: null,
  title: null,
  message: null
};

const showModal = (state, action) => {
  return {
    show: true,
    // type: action.modalType,
    // title: action.title,
    // message: action.message
  };
}

const hideModal = (state, action) =>{
  return {
    ...state,
    show: false,
    // type: null,
    // title: null,
    // message: null
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: return showModal(state, action);
    case HIDE_MODAL: return hideModal(state, action);
    default: return state;
  }
};

export default reducer;