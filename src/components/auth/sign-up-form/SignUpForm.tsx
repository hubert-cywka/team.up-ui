'use client';

import styles from '../AuthForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '@components/primitives/button/Button';
import { faLock, faAt, faUser, faCakeCandles, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Route } from '@shared/constants/Route';
import SectionHeader from '@components/structure/section-header/SectionHeader';
import { signUpValidationSchema } from '@shared/constants/FormSchemas';
import Input from '@components/primitives/input/Input';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from '@shared/constants/UserConstants';
import classNames from 'classnames';
import { SignUpRequest } from '@shared/types/Auth';

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: Date | null;
};

interface SignUpFormProps {
  onSubmit: (request: SignUpRequest) => void; // eslint-disable-line no-unused-vars
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
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
          fullWidth
          type={type}
          icon={icon}
          iconClassName={styles.inputIcon}
          className={styles.input}
          {...register(field)}
          data-testid={`${field}-input`}
        />
        <p
          className={classNames(styles.inputMessage, { [styles.error]: !!error })}
          data-testid={`${field}-label`}>
          {error ? error : info}
        </p>
      </div>
    );
  };

  return (
    <section className={styles.authFormContainer}>
      <SectionHeader
        header="Sign up."
        subheader="We are happy that you decided to join our growing community!"
        variant="inside"
      />
      <form
        className={styles.authForm}
        onSubmit={handleSubmit(() =>
          onSubmit({
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

        <Link href={Route.SIGN_IN} className={styles.navigationLink} data-testid="sign-in-link">
          I already have an account.
        </Link>

        <Button
          name="sign up button"
          className={styles.submitButton}
          type="submit"
          variant="secondary"
          data-testid="sign-up-button">
          Create account
        </Button>
      </form>
    </section>
  );
};

export default SignUpForm;
