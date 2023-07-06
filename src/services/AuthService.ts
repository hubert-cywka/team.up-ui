import { apiClient } from './ApiClient';
import { SignInRequest } from 'shared/interfaces/SignInRequest.interface';
import { SignUpRequest } from 'shared/interfaces/SignUpRequest.interface';
import { User } from 'shared/interfaces/User.interface';

export const signInUser = async (userData: SignInRequest) => {
  const { data } = await apiClient.post<User>(`/auth/login`, userData);
  return data;
};

export const signUpUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<User>(`/auth/register`, userData);
  return data;
};

export const signOutUser = async () => {
  const { data } = await apiClient.post(`/auth/logout`);
  return data;
};
