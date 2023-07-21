import { UserDetails } from '@shared/types/User';

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

export type AuthSessionStatus = 'authenticated' | 'unauthenticated' | 'loading';

export interface AuthSession {
  status: AuthSessionStatus;
  user?: UserDetails;
}
