import * as yup from 'yup';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from 'shared/constants/UserConstants';
import { MIN_AGE } from '../config/AppConfig';
import { SportNameValidation } from './SportConstants';

const getConfirmPasswordValidationSchema = (passwordFieldName: string) =>
  yup
    .string()
    .required(PasswordValidation.NEEDS_TO_BE_CONFIRMED)
    .oneOf([yup.ref(passwordFieldName)], PasswordValidation.PASSWORDS_MISMATCH);

const getPasswordValidationSchema = () =>
  yup
    .string()
    .required(PasswordValidation.IS_REQUIRED)
    .min(PasswordValidation.MIN_LENGTH, PasswordValidation.TOO_SHORT)
    .max(PasswordValidation.MAX_LENGTH, PasswordValidation.TOO_LONG);

const getUsernameValidationSchema = () =>
  yup
    .string()
    .required(UsernameValidation.IS_REQUIRED)
    .min(UsernameValidation.MIN_LENGTH, UsernameValidation.TOO_SHORT)
    .max(UsernameValidation.MAX_LENGTH, UsernameValidation.TOO_LONG);

const getEmailValidationSchema = () =>
  yup.string().required(EmailValidation.IS_REQUIRED).email(EmailValidation.WRONG_FORMAT);

const getMinDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDay());
};

const getBirthdayValidationSchema = () =>
  yup
    .date()
    .max(getMinDate(), BirthdayValidation.INFO)
    .required(BirthdayValidation.IS_REQUIRED)
    .nullable()
    .typeError(BirthdayValidation.IS_REQUIRED);

export const signUpValidationSchema = yup.object({
  name: getUsernameValidationSchema(),
  email: getEmailValidationSchema(),
  password: getPasswordValidationSchema(),
  confirmPassword: getConfirmPasswordValidationSchema('password'),
  birthday: getBirthdayValidationSchema()
});

export const getSportNameValidationSchema = () =>
  yup
    .string()
    .required(SportNameValidation.IS_REQUIRED)
    .max(SportNameValidation.MAX_LENGTH, SportNameValidation.TOO_LONG)
    .min(SportNameValidation.MIN_LENGTH, SportNameValidation.TOO_SHORT);

export const addOrEditSportDisciplineValidationSchema = yup.object({
  name: getSportNameValidationSchema()
});
