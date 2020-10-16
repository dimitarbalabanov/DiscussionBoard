import axiosInstance from './axiosInstance';
import { FORUMS_URL } from './apiRoutes';

export const getForumById = (forumId) => {
  return axiosInstance.get(FORUMS_URL + forumId);
};

export const getForums = () => {
  return axiosInstance.get(FORUMS_URL);
};
