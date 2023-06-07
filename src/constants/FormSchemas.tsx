import * as yup from 'yup';
import { EmailValidation, PasswordValidation, UsernameValidation } from '@/constants/UserConstants';

export const getPasswordValidationSchema = () =>
  yup
    .string()
    .required(PasswordValidation.PASSWORD_IS_REQUIRED)
    .min(PasswordValidation.MIN_PASSWORD_LENGTH, PasswordValidation.PASSWORD_TOO_SHORT)
    .max(PasswordValidation.MAX_PASSWORD_LENGTH, PasswordValidation.PASSWORD_TOO_LONG);

export const getUsernameValidationSchema = () =>
  yup
    .string()
    .required(UsernameValidation.USERNAME_IS_REQUIRED)
    .min(UsernameValidation.MIN_USERNAME_LENGTH, UsernameValidation.USERNAME_TOO_SHORT)
    .max(UsernameValidation.MAX_USERNAME_LENGTH, UsernameValidation.USERNAME_TOO_LONG);

export const getEmailValidationSchema = () =>
  yup.string().required(EmailValidation.EMAIL_IS_REQUIRED).email(EmailValidation.WRONG_FORMAT);
