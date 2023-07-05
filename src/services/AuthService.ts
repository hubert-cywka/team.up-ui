import { apiClient } from './ApiClient';

export enum UserRole {
  USER = 'USER', // eslint-disable-line no-unused-vars
  ADMIN = 'ADMIN' // eslint-disable-line no-unused-vars
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}

export const signInUser = async (userData: SignInRequest) => {
  const { data } = await apiClient.post<UserData>(`/auth/login`, userData);
  return data;
};

export const signUpUser = async (userData: SignUpRequest) => {
  const { data } = await apiClient.post<UserData>(`/auth/register`, userData);
  return data;
};

export const signOutUser = async () => {
  const { data } = await apiClient.post(`/auth/logout`);
  return data;
};
