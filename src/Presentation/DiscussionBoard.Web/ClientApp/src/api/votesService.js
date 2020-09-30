import axios from 'axios';
import { VOTES_URL } from './apiRoutes';
import { axiosConfig } from '../utils/axiosConfig';

export const createVote = (data) => {
  return axios.post(VOTES_URL, data, axiosConfig());
};

export const editVoteById = (voteId, data) => {
  return axios.put(VOTES_URL + voteId, data, axiosConfig());
};

export const deleteVoteById = (voteId, data) => {
  return axios.delete(VOTES_URL + voteId, data, axiosConfig());
};
