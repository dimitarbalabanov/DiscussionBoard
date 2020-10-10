import axiosInstance from './axiosInstance';
import {
  IDENTITY_LOGIN_URL,
  IDENTITY_REGISTER_URL
} from './apiRoutes';

export const loginApi = (data) => {
  return axiosInstance.post(IDENTITY_LOGIN_URL, data);
};

export const registerApi = (data) => {
  return axiosInstance.post(IDENTITY_REGISTER_URL, data);
};