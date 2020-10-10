import axiosInstance from './axiosInstance';
import { VOTES_URL } from './apiRoutes';

export const createVote = (data) => {
  return axiosInstance.post(VOTES_URL, data);
};

export const editVoteById = (voteId, data) => {
  return axiosInstance.put(VOTES_URL + voteId, data);
};

export const deleteVoteById = (voteId, data) => {
  return axiosInstance.delete(VOTES_URL + voteId, data);
};
