import axiosInstance from './axiosInstance';
import { POSTS_URL } from './apiRoutes';

export const getPostById = (postId) => {
  return axiosInstance.get(POSTS_URL + postId);
};

export const getPosts = (forumId) => {
  let query = forumId ? `?forumId=${forumId}` : '';
  return axiosInstance.get(POSTS_URL + query);
};

export const createPost = (forumId, title, content) => {
  return axiosInstance.post(POSTS_URL, { forumId, title, content });
};

export const updatePostById = (postId, title, content) => {
  return axiosInstance.put(POSTS_URL + postId, { title, content });
};

export const deletePostById = (postId) => {
  return axiosInstance.delete(POSTS_URL + postId);
};