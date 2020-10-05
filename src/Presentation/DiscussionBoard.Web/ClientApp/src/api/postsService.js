//import axios from 'axios';
import myAxios from './axiosInstance';
import { POSTS_URL } from './apiRoutes';
//import { axiosConfig } from '../utils/axiosConfig';

export const getPostById = (postId) => {
  return myAxios.get(POSTS_URL + postId);
};

export const getAllPosts = () => {
  return myAxios.get(POSTS_URL);
};

export const createPost = (data) => {
  return myAxios.post(POSTS_URL, data);
  //return axios.post(POSTS_URL, data, axiosConfig());
};

export const updatePostById = (postId, data) => {
  return myAxios.put(POSTS_URL + postId, data);
};

export const deletePostById = (postId) => {
  return myAxios.delete(POSTS_URL + postId);
};