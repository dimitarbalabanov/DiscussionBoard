import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch ( action.type ) {

    case REGISTER_START:
      return { 
        ...state,
        error: null,
        loading: true 
      };

    case REGISTER_SUCCESS:
      return { 
        ...state,
        error: null,
        loading: false 
      };

    case REGISTER_FAILURE:
      return { 
        ...state,
        error: action.error,
        loading: false
      };

    default: 
      return state;
  }
};

export default reducer;