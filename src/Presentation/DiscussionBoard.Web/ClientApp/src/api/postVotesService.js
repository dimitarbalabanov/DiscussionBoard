import axiosInstance from './axiosInstance';
import { POSTVOTES_URL } from './apiRoutes';

export const createPostVote = (postId, type) => {
  return axiosInstance.post(POSTVOTES_URL, { postId, type });
};

export const updatePostVoteById = (postVoteId, type) => {
  return axiosInstance.put(POSTVOTES_URL + postVoteId, { type });
};

export const deletePostVoteById = (postVoteId) => {
  return axiosInstance.delete(POSTVOTES_URL + postVoteId);
};
