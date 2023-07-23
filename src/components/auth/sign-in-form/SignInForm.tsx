'use client';

import styles from '../AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import Button from '@components/primitives/button/Button';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Route } from '@shared/constants/Route';
import SectionHeader from '@components/structure/section-header/SectionHeader';
import Input from '@components/primitives/input/Input';
import { SignInRequest } from '@shared/types/Auth';

type SignInInputs = {
  email: string;
  password: string;
};

interface SignInFormProps {
  onSubmit: (request: SignInRequest) => void; // eslint-disable-line no-unused-vars
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const { register, handleSubmit, getValues } = useForm<SignInInputs>();

  const handleSignIn = () => {
    onSubmit({ email: getValues('email'), password: getValues('password') });
  };

  return (
    <section className={styles.authFormContainer}>
      <SectionHeader header="Sign in." subheader="It's nice to see you back!" variant="inside" />
      <form className={styles.authForm} onSubmit={handleSubmit(handleSignIn)}>
        <Input
          fullWidth
          icon={faAt}
          iconClassName={styles.inputIcon}
          className={styles.input}
          {...register('email')}
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
        />
        <Input
          fullWidth
          icon={faLock}
          iconClassName={styles.inputIcon}
          className={styles.input}
          {...register('password')}
          type="password"
          placeholder="Password"
          data-testid="password-input"
        />
        <Link href={Route.SIGN_UP} className={styles.navigationLink} data-testid="sign-up-link">
          {`I don't have account yet.`}
        </Link>
        <Button
          type="submit"
          variant="secondary"
          name="sign in button"
          data-testid="sign-in-button">
          Sign in
        </Button>
      </form>
    </section>
  );
};

export default SignInForm;
