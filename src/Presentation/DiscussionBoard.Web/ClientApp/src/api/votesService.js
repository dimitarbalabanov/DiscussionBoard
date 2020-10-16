import axiosInstance from './axiosInstance';
import { VOTES_URL } from './apiRoutes';

export const createVote = (commentId, type) => {
  return axiosInstance.post(VOTES_URL, { commentId, type });
};

export const updateVoteById = (voteId, type) => {
  return axiosInstance.put(VOTES_URL + voteId, { type });
};

export const deleteVoteById = (voteId) => {
  return axiosInstance.delete(VOTES_URL + voteId);
};
