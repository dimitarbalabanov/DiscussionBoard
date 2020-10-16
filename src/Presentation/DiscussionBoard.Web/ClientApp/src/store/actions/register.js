import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './actionTypes';
import { auth } from './auth';
import { showSnackbar } from './snackbar';
import { register as registerApi } from '../../api/identityService';

export const register = (email, password, confirmPassword, username) => {
  return {
    types: [
      REGISTER_START,
      REGISTER_SUCCESS,
      REGISTER_FAILURE
    ],
    callApi: () => registerApi({email, password, confirmPassword, username}),
    effect({ dispatch, state, type}) {
      if (type === REGISTER_SUCCESS) {
        dispatch(showSnackbar('success', 'Successfully registered. Go sign in.'));
        dispatch(auth(email, password));
      }
      if (type === REGISTER_FAILURE) {
        dispatch(showSnackbar('error', "Error registering."))
      }
    }
  }
};