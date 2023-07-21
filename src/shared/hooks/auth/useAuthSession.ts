import { AuthSession } from '@shared/types/Auth';
import { useSession } from 'next-auth/react';
import { UserDetails } from '@shared/types/User';

export const useAuthSession = (): AuthSession => {
  const session = useSession();
  return {
    status: session.status,
    user: session.data?.user as UserDetails
  };
};
