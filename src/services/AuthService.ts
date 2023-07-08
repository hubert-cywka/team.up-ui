import { apiClient } from './ApiClient';
import { SignInRequest } from 'shared/interfaces/SignInRequest.interface';
import { SignUpRequest } from 'shared/interfaces/SignUpRequest.interface';
import { UserDetails } from 'shared/interfaces/UserDetails.interface';

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
