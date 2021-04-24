import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
