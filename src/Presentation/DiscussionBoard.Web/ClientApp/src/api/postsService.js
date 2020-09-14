import axios from 'axios';
import { POSTS_URL } from './apiRoutes';

export const getPostById = (postId) => {
  return axios.get(POSTS_URL + postId);
};

export const createPost = (data) => {
  return axios.post(POSTS_URL, data, {
    headers: {Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhc2RmIiwianRpIjoiZjMzZjU3MjgtNzliOS00NzkzLTk5YmQtYjY0YjI0YmJiMjQ0IiwiZW1haWwiOiJhc2RAYXNkLmJnIiwidWlkIjoiMmNhNWI5MzgtNWQwMi00YWUyLWI4YWUtNzRhZGVhNzQ2YjY5IiwibmJmIjoxNjAwMDE4MTg3LCJleHAiOjE2MDAwMjUzODcsImlhdCI6MTYwMDAxODE4N30.wUhJ6cGBKmBD2KkN3vTk4Mi-lTUrXpRDWRipd1eEUSQ'}
  });
};

export const editPostById = (postId, data) => {
  return axios.put(POSTS_URL + postId, data);
};

export const deletePostById = (postId, data) => {
  return axios.delete(POSTS_URL + postId, data);
};