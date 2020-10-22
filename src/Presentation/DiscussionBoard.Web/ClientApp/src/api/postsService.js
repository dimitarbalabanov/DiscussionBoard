import axiosInstance from './axiosInstance';
import { POSTS_URL, POSTS_QUERY_URL } from './apiRoutes';

export const getPostById = (postId) => {
  return axiosInstance.get(POSTS_URL + postId);
};

export const getPosts = (forumId, pageNumber) => {
  const queries = [];
  if (forumId) {
    queries.push(`forumId=${forumId}`);
  }

  if (pageNumber) {
    queries.push(`pageNumber=${pageNumber}`);
  }

  return axiosInstance.get(POSTS_URL + '?' + queries.join('&'));
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


// const queries = [];
// if (forumId) {
//   queries.push(`forumId=${forumId}`)
// }
// if (pageNumber) {
//   queries.push(`pageNumber=${pageNumber}`)
// }
// const queryString = queries.length > 0 ? '?' + queries.join('&') : '';
// return axiosInstance.get(POSTS_URL + queryString);