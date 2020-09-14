import { store } from '../index';

export const axiosConfig = () => {
  const token = store.getState().auth.token;
  if (token) {
    const config = {
      headers: {Authorization: 'Bearer ' + token},
    };

    return config;
  }

  return null;
};
