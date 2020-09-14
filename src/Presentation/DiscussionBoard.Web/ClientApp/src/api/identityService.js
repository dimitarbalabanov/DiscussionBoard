import axios from 'axios';
import {
  IDENTITY_LOGIN_URL,
  IDENTITY_REGISTER_URL
} from './apiRoutes';

export const loginApi = (data) => {
  return axios.post(IDENTITY_LOGIN_URL, data);
};

export const registerApi = (data) => {
  return axios.post(IDENTITY_REGISTER_URL, data);
};