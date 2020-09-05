import axios from 'axios';
import { POSTS_URL } from './api-routes';

export const getPostById = (postId) => {
  return axios.get(POSTS_URL + postId);
};

export const createPost = (data) => {
  return axios.post(POSTS_URL, data);
};

export const editPostById = (postId, data) => {
  return axios.put(POSTS_URL + postId, data);
};

export const deletePostById = (postId, data) => {
  return axios.delete(POSTS_URL + postId, data);
};