import axios, { AxiosError, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await instance.post<string>('/auth/refresh-token', {
          token: refreshToken
        });

        const newAccessToken = response.data;
        localStorage.setItem('accessToken', newAccessToken);

        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
