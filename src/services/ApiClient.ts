import axios, { HttpStatusCode } from 'axios';
import { refreshToken } from './AuthService';
import { signOut } from 'next-auth/react';

export const apiURL = process.env.REACT_APP_PROD_API_URL ?? 'http://localhost:8080/app';

export const apiClient = axios.create({
  baseURL: apiURL,
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
    status === HttpStatusCode.Unauthorized && message?.includes('Refresh token');

  if (shouldRefreshToken) {
    return refreshToken()
      .then(() => {
        return apiClient.request(error.config);
      })
      .catch(async (error) => {
        if (error?.response?.status === HttpStatusCode.Unauthorized) {
          await signOut();
        }
      });
  }

  return Promise.reject(error);
});
