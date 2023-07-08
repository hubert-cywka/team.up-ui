import { signUpUser } from '../../../services/AuthService';
import { useMutation } from 'react-query';

export const useSignUp = () => {
  return useMutation(['SIGN_UP'], signUpUser);
};
