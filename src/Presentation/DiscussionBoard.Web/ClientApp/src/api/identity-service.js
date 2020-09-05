import axios from 'axios';
import {
  IDENTITY_LOGIN_URL,
  IDENTITY_REGISTER_URL
} from './api-routes';

export const login = (data) => {
  return axios.post(IDENTITY_LOGIN_URL, data);
};

export const register = (data) => {
  return axios.post(IDENTITY_REGISTER_URL, data);
};