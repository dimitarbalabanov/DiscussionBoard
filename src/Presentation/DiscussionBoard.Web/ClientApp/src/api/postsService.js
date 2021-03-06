import axiosInstance from './axiosInstance';
//import axios from 'axios'
import { POSTS_URL } from './apiRoutes';

export const getPostById = (postId) => {
  return axiosInstance.get(POSTS_URL + postId);
};

export const getPosts = (sort, top, forumId, cursor) => {
  const queries = [];
  if (sort) {
    queries.push(`sort=${sort}`);
  }

  if (top) {
    queries.push(`top=${top}`);
  }

  if (forumId) {
    queries.push(`forumId=${forumId}`);
  }

  if (cursor) {
    queries.push(`cursor=${cursor}`);
  }
  
  // const queryString = queries.length > 0 ? '?' + queries.join('&') : '';
  return axiosInstance.get(POSTS_URL + '?' + queries.join('&'));
};

// export const createPost = (forumId, title, content) => {
//   return axiosInstance.post(POSTS_URL, { forumId, title, content });
// };
export const createPost = (formData) => {
  return axiosInstance.post(POSTS_URL, formData);
};

export const updatePostById = (postId, title, content) => {
  return axiosInstance.put(POSTS_URL + postId, { title, content });
};

export const deletePostById = (postId) => {
  return axiosInstance.delete(POSTS_URL + postId);
};
