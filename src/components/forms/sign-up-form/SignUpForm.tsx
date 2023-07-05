'use client';

import styles from '../AuthForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Button from 'components/primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt, faUser, faCakeCandles, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Route } from 'constants/Route';
import SectionHeader from 'components/primitives/section-header/SectionHeader';
import {
  getBirthdayValidationSchema,
  getConfirmPasswordValidationSchema,
  getEmailValidationSchema,
  getPasswordValidationSchema,
  getUsernameValidationSchema
} from 'constants/FormSchemas';
import Input from '../../primitives/input/Input';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from '../../../constants/UserConstants';
import { SignUpRequest } from '../../../services/AuthService';
import classNames from 'classnames';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: Date | null;
};

interface SignUpFormProps {
  onSignUp: (request: SignUpRequest) => void; // eslint-disable-line no-unused-vars
}

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
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
        <span className={styles.inputName}>{name}</span>
        <Input
          type={type}
          icon={<FontAwesomeIcon className={styles.inputIcon} icon={icon} />}
          className={styles.input}
          {...register(field)}
        />
        <p className={classNames(styles.inputMessage, { [styles.error]: !!error })}>
          {error ? error : info}
        </p>
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
      <form
        className={styles.authForm}
        onSubmit={handleSubmit(() =>
          onSignUp({
            email: getValues('email'),
            password: getValues('password'),
            name: getValues('name'),
            birthdate: getValues('birthday')?.toString() ?? ''
          })
        )}>
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

        <Link href={Route.SIGNIN} className={styles.navigationLink}>
          {`I already have an account.`}
        </Link>

        <section className={styles.buttonsContainer}>
          <Button type="submit" variant="secondary">
            Create account
          </Button>
        </section>
      </form>
    </div>
  );
};

export default SignUpForm;
