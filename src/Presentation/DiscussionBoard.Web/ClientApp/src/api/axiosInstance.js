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
      //'Content-Type': 'application/x-www-form-urlencoded'
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
  //if (error.response) {
    console.log('---error response');
    console.log(error.response)
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('--data');
    console.log(error.response.data);
    console.log('--status');
    console.log(error.response.status);
    console.log('--headers');
    console.log(error.response.headers);
    console.log('------------------------------')
  //} else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('---error request')
    console.log(error.request);
    console.log('------------------------------')

  //} else {
    // Something happened in setting up the request that triggered an Error
    console.log('---error')
    console.log('--message')
    console.log(error.message);
    console.log('------------------------------')

  //}
  console.log('---error config')
  console.log(error.config);
  return Promise.reject(error);
});

export default instance;