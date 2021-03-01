import axiosInstance from './axiosInstance';
import { FORUMS_URL } from './apiRoutes';

export const getForumById = (forumId) => {
  return axiosInstance.get(FORUMS_URL + forumId);
};

export const getForums = () => {
  return axiosInstance.get(FORUMS_URL);
};

export const createForum = (formData) => {
  return axiosInstance.post(FORUMS_URL, {...formData});
};

export const updateForumById = (forumId, formData) => {
  return axiosInstance.put(FORUMS_URL + forumId, {...formData});
};

export const deleteForumById = (forumId) => {
  return axiosInstance.delete(FORUMS_URL + forumId);
};
