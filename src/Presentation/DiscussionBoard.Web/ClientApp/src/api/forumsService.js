import axios from 'axios';
import { FORUMS_URL } from './apiRoutes';

export const getForumById = (forumId) => {
  return axios.get(FORUMS_URL + forumId);
};

export const getAllForums = () => {
  return axios.get(FORUMS_URL);
};
