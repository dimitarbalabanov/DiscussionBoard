import axiosInstance from './axiosInstance';
import { COMMENTS_URL } from './apiRoutes';

export const getComments = (postId, sort, top, cursor) => {
  const queries = [];
  if (postId) {
    queries.push(`postId=${postId}`);
  }
  if (sort) {
    queries.push(`sort=${sort}`);
  }

  if (top) {
    queries.push(`top=${top}`);
  }

  if (cursor) {
    queries.push(`cursor=${cursor}`);
  }
  
  return axiosInstance.get(COMMENTS_URL + '?' + queries.join('&'));
};

export const createComment = (content, postId) => {
  return axiosInstance.post(COMMENTS_URL, { content, postId });
};

export const updateCommentById = (commentId, content) => {
  return axiosInstance.put(COMMENTS_URL + commentId, { content });
};

export const deleteCommentById = (commentId) => {
  return axiosInstance.delete(COMMENTS_URL + commentId);
};
