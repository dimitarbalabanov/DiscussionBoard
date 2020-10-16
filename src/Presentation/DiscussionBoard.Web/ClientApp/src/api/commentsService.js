import axiosInstance from './axiosInstance';
import { COMMENTS_URL } from './apiRoutes';

export const getComments = (postId) => {
  let query = postId ? `?postId=${postId}` : '';
  return axiosInstance.get(COMMENTS_URL + query);
};

export const createComment = (content, postId) => {
  return axiosInstance.post(COMMENTS_URL, { content, postId });
};

export const updateCommentById = (commentId, content) => {
  return axiosInstance.put(COMMENTS_URL + commentId, content);
};

export const deleteCommentById = (commentId) => {
  return axiosInstance.delete(COMMENTS_URL + commentId);
};
