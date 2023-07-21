import { useMutation } from 'react-query';
import { signInUser } from '@services/AuthService';

export const useSignIn = () => {
  return useMutation(['SIGN_IN'], signInUser);
};
