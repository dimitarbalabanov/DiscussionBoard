import axios from 'axios';
import store from '../store';

// const defaultOptions = {
//   baseURL: process.env.REACT_APP_API_PATH,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// };

const instance = axios.create();

instance.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers = { 
      'Authorization': `Bearer ${token}`,
      //'Accept': 'application/json',
      //'Content-Type': 'application/json'
    };
  }
    return config;
  },
  error => {
    Promise.reject(error)
});

instance.interceptors.response.use((response) => {
    return response
}, error => {
  if (error.response) {
    console.log(error)
    console.log(error.response.status)
    console.log(error.response.data)
    error = error.response.data ?? error.response.status;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error)
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    error = error.message;
    console.log(error);
    console.log(error.message)
    console.log(error.type)
    console.log(error.code)
  }
  // console.log(error.config);
  return Promise.reject(error);
});

export default instance;