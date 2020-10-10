import axiosInstance from './axiosInstance';
import { COMMENTS_URL } from './apiRoutes';

export const createComment = (comment) => {
  return axiosInstance.post(COMMENTS_URL, comment);
};

export const editCommentById = (commentId, newComment) => {
  return axiosInstance.put(COMMENTS_URL + commentId, newComment);
};

export const deleteCommentById = (commentId) => {
  return axiosInstance.delete(COMMENTS_URL + commentId);
};
