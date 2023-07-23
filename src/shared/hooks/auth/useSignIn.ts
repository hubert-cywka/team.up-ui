import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SignInRequest } from '@shared/types/Auth';
import { Route } from '@shared/constants/Route';
import { useRouter } from 'next/router';
import { DataStatus } from '@shared/types/Other';

export const useSignIn = () => {
  const router = useRouter();
  const [status, setStatus] = useState<DataStatus>('idle');

  const handleSignIn = async (request: SignInRequest) => {
    setStatus('loading');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: request.email,
        password: request.password
      });

      if (!res?.error) {
        setStatus('success');
        await router.push(router.query.referer?.toString() ?? Route.HOME);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return { signIn: handleSignIn, status };
};
