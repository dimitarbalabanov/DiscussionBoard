import axios from 'axios';
import { VOTES_URL } from './apiRoutes';

export const createVote = (data) => {
  return axios.post(VOTES_URL, data);
};

export const editVoteById = (voteId, data) => {
  return axios.put(VOTES_URL + voteId, data);
};

export const deleteVoteById = (voteId, data) => {
  return axios.delete(VOTES_URL + voteId, data);
};
