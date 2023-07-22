import axios, { HttpStatusCode } from 'axios';
import { refreshToken } from './AuthService';
import { signOut } from 'next-auth/react';
import { API_URL } from '@shared/config/AppConfig';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
});

apiClient.interceptors.response.use(null, (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data.message;
  const shouldRefreshToken =
    status === HttpStatusCode.Unauthorized && message?.includes('Authorization token');

  if (shouldRefreshToken) {
    return refreshToken()
      .then(() => {
        return apiClient.request(error.config);
      })
      .catch(async () => {
        await signOut();
      });
  }

  return Promise.reject(error);
});
