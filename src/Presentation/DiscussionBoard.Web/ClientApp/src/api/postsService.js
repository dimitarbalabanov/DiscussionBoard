import axiosInstance from './axiosInstance';
import { POSTS_URL } from './apiRoutes';

export const getPostById = (postId) => {
  return axiosInstance.get(POSTS_URL + postId);
};

export const getAllPosts = (forumId) => {
  let query = forumId ? `?forumId=${forumId}` : '';
  return axiosInstance.get(POSTS_URL + query);
};

export const createPost = (post) => {
  return axiosInstance.post(POSTS_URL, post);
};

export const updatePostById = (postId, newPost) => {
  return axiosInstance.put(POSTS_URL + postId, newPost);
};

export const deletePostById = (postId) => {
  return axiosInstance.delete(POSTS_URL + postId);
};