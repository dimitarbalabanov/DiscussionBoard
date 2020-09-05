import axios from 'axios';
import { FORUMS_URL } from './api-routes';

export const getForumById = (forumId) => {
  return axios.get(FORUMS_URL + forumId);
};

export const getAllForums = () => {
  return axios.get(FORUMS_URL);
};
