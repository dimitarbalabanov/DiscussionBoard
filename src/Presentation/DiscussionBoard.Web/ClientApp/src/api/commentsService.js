import axios from 'axios';
import { COMMENTS_URL } from './apiRoutes';
import { axiosConfig } from '../utils/axiosConfig';

export const createComment = (data) => {
  return axios.post(COMMENTS_URL, data, axiosConfig());
};

export const editCommentById = (commentId, data) => {
  return axios.put(COMMENTS_URL + commentId, data, axiosConfig());
};

export const deleteCommentById = (commentId) => {
  return axios.delete(COMMENTS_URL + commentId, axiosConfig());
};
