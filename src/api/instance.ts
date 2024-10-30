import axios, { AxiosError, AxiosResponse } from 'axios';
import { EAxiosPaths } from '@root/enums/axiosPaths.enum';
import { ELocalStorageKeys } from '@root/enums/localStorageKeys.enum';
const backendLink = import.meta.env.VITE_BACKEND_LINK;

const instance = axios.create({
  baseURL: backendLink
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN)}`;
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      const refreshToken = localStorage.getItem(ELocalStorageKeys.REFRESH_TOKEN);
      if (refreshToken) {
        const response = await instance.post<string>(EAxiosPaths.REFRESH_TOKEN, {
          token: refreshToken
        });

        const newAccessToken = response.data;
        localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, newAccessToken);

        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
