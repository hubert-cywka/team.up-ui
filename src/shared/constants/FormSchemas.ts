import * as yup from 'yup';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from 'shared/constants/UserConstants';
import { MIN_AGE } from '../config/AppConfig';

export const getConfirmPasswordValidationSchema = (passwordFieldName: string) =>
  yup
    .string()
    .required(PasswordValidation.NEEDS_TO_BE_CONFIRMED)
    .oneOf([yup.ref(passwordFieldName)], PasswordValidation.PASSWORDS_MISMATCH);

export const getPasswordValidationSchema = () =>
  yup
    .string()
    .required(PasswordValidation.IS_REQUIRED)
    .min(PasswordValidation.MIN_LENGTH, PasswordValidation.TOO_SHORT)
    .max(PasswordValidation.MAX_LENGTH, PasswordValidation.TOO_LONG);

export const getUsernameValidationSchema = () =>
  yup
    .string()
    .required(UsernameValidation.IS_REQUIRED)
    .min(UsernameValidation.MIN_LENGTH, UsernameValidation.TOO_SHORT)
    .max(UsernameValidation.MAX_LENGTH, UsernameValidation.TOO_LONG);

export const getEmailValidationSchema = () =>
  yup.string().required(EmailValidation.IS_REQUIRED).email(EmailValidation.WRONG_FORMAT);

const getMinDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDay());
};

export const getBirthdayValidationSchema = () =>
  yup
    .date()
    .max(getMinDate(), BirthdayValidation.INFO)
    .required(BirthdayValidation.IS_REQUIRED)
    .nullable()
    .typeError(BirthdayValidation.IS_REQUIRED);
