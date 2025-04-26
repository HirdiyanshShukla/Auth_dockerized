import axios from 'axios';

const baseURL = 'https://your-backend-app-name.onrender.com/'; // Django base

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response interceptor to handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and hasn't been retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.data.access;
        localStorage.setItem('access_token', newAccessToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        // optionally redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
