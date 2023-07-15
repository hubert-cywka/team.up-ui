export enum UserRole {
  USER = 'USER', // eslint-disable-line no-unused-vars
  ADMIN = 'ADMIN' // eslint-disable-line no-unused-vars
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}

export type UserType =
  | 'authenticated'
  | 'unauthenticated'
  | 'authenticated_user'
  | 'authenticated_admin';
