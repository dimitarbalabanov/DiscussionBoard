import axiosInstance from './axiosInstance';
import { SAVEDPOSTS_URL } from './apiRoutes';

export const createSavedPost = (postId) => {
  return axiosInstance.post(SAVEDPOSTS_URL, { postId });
};

export const deleteSavedPostById = (postId) => {
  return axiosInstance.delete(SAVEDPOSTS_URL + postId);
};
