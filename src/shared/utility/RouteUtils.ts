import { UserRole } from 'shared/enums/UserRole.enum';
import { User } from 'next-auth';

type UserType = 'authenticated' | 'unauthenticated' | 'authenticated_user' | 'authenticated_admin';

export const checkIfShouldRedirect = (prevent: UserType, user?: User) => {
  switch (prevent) {
    case 'authenticated':
      return !!user;

    case 'unauthenticated':
      return !user;

    case 'authenticated_user':
      return !!user && user?.role === UserRole.USER;

    case 'authenticated_admin':
      return !!user && user?.role === UserRole.ADMIN;
  }
};
