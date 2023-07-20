import * as yup from 'yup';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from 'shared/constants/UserConstants';
import { MIN_AGE } from '../config/AppConfig';
import { SportDisciplineNameValidation } from './SportDisciplineConstants';
import {
  SportEventDateValidation,
  SportEventDescriptionValidation,
  SportEventDisciplineValidation,
  SportEventLocationValidation,
  SportEventPlayersNumberValidation
} from './SportEventConstants';

const getMinBirthdayDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDay());
};

export const signUpValidationSchema = yup.object({
  name: yup
    .string()
    .required(UsernameValidation.IS_REQUIRED)
    .min(UsernameValidation.MIN_LENGTH, UsernameValidation.TOO_SHORT)
    .max(UsernameValidation.MAX_LENGTH, UsernameValidation.TOO_LONG),
  email: yup.string().required(EmailValidation.IS_REQUIRED).email(EmailValidation.WRONG_FORMAT),

  password: yup
    .string()
    .required(PasswordValidation.IS_REQUIRED)
    .min(PasswordValidation.MIN_LENGTH, PasswordValidation.TOO_SHORT)
    .max(PasswordValidation.MAX_LENGTH, PasswordValidation.TOO_LONG),

  confirmPassword: yup
    .string()
    .required(PasswordValidation.NEEDS_TO_BE_CONFIRMED)
    .oneOf([yup.ref('password')], PasswordValidation.PASSWORDS_MISMATCH),

  birthday: yup
    .date()
    .max(getMinBirthdayDate(), BirthdayValidation.INFO)
    .required(BirthdayValidation.IS_REQUIRED)
    .nullable()
    .typeError(BirthdayValidation.IS_REQUIRED)
});

export const addOrEditSportDisciplineValidationSchema = yup.object({
  name: yup
    .string()
    .required(SportDisciplineNameValidation.IS_REQUIRED)
    .max(SportDisciplineNameValidation.MAX_LENGTH, SportDisciplineNameValidation.TOO_LONG)
    .min(SportDisciplineNameValidation.MIN_LENGTH, SportDisciplineNameValidation.TOO_SHORT)
});

export const addSportEventValidationSchema = yup.object({
  description: yup
    .string()
    .required(SportEventDescriptionValidation.IS_REQUIRED)
    .max(SportEventDescriptionValidation.MAX_LENGTH, SportEventDescriptionValidation.TOO_LONG),

  startDate: yup
    .date()
    .min(new Date(), SportEventDateValidation.INFO)
    .required(SportEventDateValidation.IS_REQUIRED)
    .nullable()
    .typeError(SportEventDateValidation.IS_REQUIRED),

  minPlayers: yup
    .number()
    .min(
      SportEventPlayersNumberValidation.MIN_PARTICIPANTS,
      SportEventPlayersNumberValidation.MIN_TOO_LOW
    )
    .max(yup.ref('maxPlayers'), SportEventPlayersNumberValidation.MIN_TOO_HIGH)
    .typeError(SportEventPlayersNumberValidation.IS_REQUIRED)
    .required(SportEventPlayersNumberValidation.IS_REQUIRED),

  maxPlayers: yup
    .number()
    .min(yup.ref('maxPlayers'), SportEventPlayersNumberValidation.MAX_TOO_LOW)
    .max(1000, SportEventPlayersNumberValidation.MAX_TOO_HIGH)
    .typeError(SportEventPlayersNumberValidation.IS_REQUIRED)
    .required(SportEventPlayersNumberValidation.IS_REQUIRED),

  location: yup
    .object({
      lat: yup.number().required(SportEventLocationValidation.IS_REQUIRED),
      lng: yup.number().required(SportEventLocationValidation.IS_REQUIRED)
    })
    .default(null)
    .required(SportEventLocationValidation.IS_REQUIRED)
    .nullable()
    .test('isSelected', SportEventLocationValidation.IS_REQUIRED, (value) => !!value),

  sportDiscipline: yup
    .object({
      name: yup.string().required(SportEventDisciplineValidation.IS_REQUIRED),
      _id: yup.string().required(SportEventDisciplineValidation.IS_REQUIRED)
    })
    .default(null)
    .required(SportEventDisciplineValidation.IS_REQUIRED)
    .nullable()
    .test('isSelected', SportEventDisciplineValidation.IS_REQUIRED, (value) => !!value)
});
