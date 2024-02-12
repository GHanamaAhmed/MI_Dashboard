import axios from 'axios';
import config from '../config';
const Axios = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
});
export { Axios };
