import { UserRole, UserType } from 'shared/types/User.d';
import { User } from 'next-auth';

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

export const routeWithReferer = (route: string, referer: string) => {
  return route.concat(`?referer=${referer}`);
};
