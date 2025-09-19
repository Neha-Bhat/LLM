import axios from "axios";
const token = localStorage.getItem('token');

// Creation of axios instance
const api = axios.create({
    baseURL: 'http://localhost:3100/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

api.interceptors.request.use((config) => {
    
    console.log(token)
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(config)
    return config;
}, (error) => {
    return Promise.reject(error)
}
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // e.g. redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default api;