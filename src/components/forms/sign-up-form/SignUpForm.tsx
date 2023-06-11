'use client';

import styles from '../AuthForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Button from 'primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt, faUser, faCakeCandles, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RouteConstants } from 'constants/RouteConstants';
import SectionHeader from 'primitives/section-header/SectionHeader';
import {
  getBirthdayValidationSchema,
  getConfirmPasswordValidationSchema,
  getEmailValidationSchema,
  getPasswordValidationSchema,
  getUsernameValidationSchema
} from 'constants/FormSchemas';
import Input from '../../../primitives/input/Input';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from '../../../constants/UserConstants';
import { signUpUser } from '../../../services/AuthService';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
};

const SignUpForm = () => {
  const signUpValidationSchema = yup.object({
    name: getUsernameValidationSchema(),
    email: getEmailValidationSchema(),
    password: getPasswordValidationSchema(),
    confirmPassword: getConfirmPasswordValidationSchema('password'),
    birthday: getBirthdayValidationSchema()
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<SignUpInputs>({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema)
  });

  const handleSignUp = () => {
    signUpUser({
      email: getValues('email'),
      password: getValues('password'),
      name: getValues('name'),
      birthdate: getValues('birthday')
    })
      .then(() => {
        console.log('success');  // TODO handle it correctly
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const buildInput = (
    field: 'name' | 'email' | 'password' | 'confirmPassword' | 'birthday',
    type: 'password' | 'text' | 'date',
    icon: IconDefinition,
    name: string,
    info: string,
    error?: string
  ) => {
    return (
      <div className={styles.inputContainer}>
        <div className={styles.inputName}>{name}</div>
        <Input
          type={type}
          icon={<FontAwesomeIcon className={styles.inputIcon} icon={icon} />}
          className={styles.input}
          {...register(field)}
        />
        <div className={`${styles.inputMessage} ${error ? styles['error'] : ''}`}>
          {error ? error : info}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.authFormContainer}>
      <SectionHeader
        header="Sign up."
        subheader="We are happy that you decided to join our growing community!"
        variant="inside"
      />
      <form className={styles.authForm} onSubmit={handleSubmit(handleSignUp)}>
        {buildInput(
          'name',
          'text',
          faUser,
          'What should we call you?',
          UsernameValidation.INFO,
          errors.name?.message
        )}

        {buildInput(
          'email',
          'text',
          faAt,
          'Your e-mail address.',
          EmailValidation.INFO,
          errors.email?.message
        )}

        {buildInput(
          'password',
          'password',
          faLock,
          'Create password.',
          PasswordValidation.INFO,
          errors.password?.message
        )}

        {buildInput(
          'confirmPassword',
          'password',
          faKey,
          'Confirm password.',
          PasswordValidation.CONFIRM_INFO,
          errors.confirmPassword?.message
        )}

        {buildInput(
          'birthday',
          'date',
          faCakeCandles,
          'Enter your date of birth.',
          BirthdayValidation.INFO,
          errors.birthday?.message
        )}

        <Link href={RouteConstants.SIGNIN} className={styles.navigationLink}>
          {`I already have an account.`}
        </Link>

        <div className={styles.buttonsContainer}>
          <Button type="submit" variant="secondary">
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
