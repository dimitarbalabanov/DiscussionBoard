import axiosInstance from './axiosInstance';
import { COMMENTVOTES_URL } from './apiRoutes';

export const createCommentVote = (commentId, type) => {
  return axiosInstance.post(COMMENTVOTES_URL, { commentId, type });
};

export const updateCommentVoteById = (commentVoteId, type) => {
  return axiosInstance.put(COMMENTVOTES_URL + commentVoteId, { type });
};

export const deleteCommentVoteById = (commentVoteId) => {
  return axiosInstance.delete(COMMENTVOTES_URL + commentVoteId);
};
