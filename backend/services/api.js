import axios from 'axios';

// Create an Axios instance that points to your Express backend
const api = axios.create({
  // IMPORTANT: Ensure this base URL matches the port your backend is running on
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token (if available) to all requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
