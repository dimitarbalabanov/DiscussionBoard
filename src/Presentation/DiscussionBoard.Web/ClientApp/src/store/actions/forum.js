import * as actionTypes from './actionTypes';
import { getForumById } from '../../api/forumsService';
import { showSnackbar } from './snackbar';

// export const fetchForumByIdSuccess = (forum) => {
//   return {
//     type: actionTypes.FETCH_FORUM_SUCCESS,
//     forum: forum
//   };
// };

// export const fetchForumByIdFail = (error) => {
//   return {
//     type: actionTypes.FETCH_FORUM_FAILURE,
//     error: error
//   };
// };

// export const fetchForumByIdStart = () => {
//   return {
//     type: actionTypes.FETCH_FORUM_START
//   };
// };

// export const fetchForumById = (forumId) => {
//   return dispatch => {
//     dispatch(fetchForumByIdStart());
//     getForumById(forumId)
//       .then(res => dispatch(fetchForumByIdSuccess(res.data)))
//       .catch(err => { 
//         dispatch(fetchForumByIdFail(err));
//         //dispatch(showSnackbar("error", err.message));
//       });
//     };
// };

export function fetchForumById(forumId) {
  return {
    types: [
      actionTypes.FETCH_FORUM_START,
      actionTypes.FETCH_FORUM_SUCCESS,
      actionTypes.FETCH_FORUM_FAILURE
    ],
    callAPI: () => getForumById(forumId),
    effect({ dispatch, state, type}) {
      if (type === actionTypes.FETCH_FORUM_SUCCESS) {
        dispatch(showSnackbar('success', `Successfully fetched the forum with id: ${state.forum.forum.id}.`))
      }
      if (type === actionTypes.FETCH_FORUM_FAILURE) {
        dispatch(showSnackbar('error', state.forum.forumError))
      }
    }
  }
}