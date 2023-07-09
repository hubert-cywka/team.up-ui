import { apiClient } from './ApiClient';
import { SignInRequest, SignUpRequest } from 'shared/types/Auth';
import { UserDetails } from 'shared/types/User';

export const signInUser = async (userData: SignInRequest) => {
  const { data, headers } = await apiClient.post<UserDetails>(`/auth/login`, userData);
  return { data, headers };
};

export const signUpUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<UserDetails>(`/auth/register`, userData);
  return data;
};

export const signOutUser = async () => {
  const { data } = await apiClient.post(`/auth/logout`);
  return data;
};

export const refreshToken = async () => {
  const { data } = await apiClient.post(`/auth/refresh`);
  return data;
};
