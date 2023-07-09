export * from 'next-auth';
export * from 'next-auth/jwt';

declare module 'next-auth' {
  import { UserRole } from './src/services/AuthService';
  import { DefaultSession } from 'next-auth';

  interface User {
    role: UserRole;
  }

  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  import { UserRole } from './src/services/AuthService';

  // eslint-disable-next-line no-unused-vars
  interface JWT {
    role: UserRole;
    expires_at?: number;
  }
}
