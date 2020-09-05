import axios from 'axios';
import { COMMENTS_URL } from './api-routes';

export const createComment = (data) => {
  return axios.post(COMMENTS_URL, data);
};

export const editCommentById = (commentId, data) => {
  return axios.put(COMMENTS_URL + commentId, data);
};

export const deleteCommentById = (commentId, data) => {
  return axios.delete(COMMENTS_URL + commentId, data);
};
