import axiosInstance from './axiosInstance';
import {
  IDENTITY_LOGIN_URL,
  IDENTITY_REGISTER_URL
} from './apiRoutes';

export const login = (email, password) => {
  return axiosInstance.post(IDENTITY_LOGIN_URL, { email, password });
};

export const register = (email, username, password, confirmPassword) => {
  return axiosInstance.post(IDENTITY_REGISTER_URL, { email, username, password, confirmPassword });
};