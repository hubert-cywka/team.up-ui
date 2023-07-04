'use client';

import styles from '../AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import Button from 'components/primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Route } from 'constants/Route';
import SectionHeader from 'components/primitives/section-header/SectionHeader';
import Input from '../../primitives/input/Input';
import { SignInRequest } from '../../../services/AuthService';

type SignInInputs = {
  email: string;
  password: string;
};

interface SignInFormProps {
  onSignIn: (request: SignInRequest) => void; // eslint-disable-line no-unused-vars
}

const SignInForm = ({ onSignIn }: SignInFormProps) => {
  const { register, handleSubmit, getValues } = useForm<SignInInputs>();

  const handleSignIn = () => {
    onSignIn({ email: getValues('email'), password: getValues('password') });
  };

  return (
    <div className={styles.authFormContainer}>
      <SectionHeader header="Sign in." subheader="It's nice to see you back!" variant="inside" />
      <form className={styles.authForm} onSubmit={handleSubmit(handleSignIn)}>
        <Input
          icon={<FontAwesomeIcon className={styles.inputIcon} icon={faAt} />}
          className={styles.input}
          {...register('email')}
          type="email"
          placeholder="E-mail"
        />
        <Input
          icon={<FontAwesomeIcon className={styles.inputIcon} icon={faLock} />}
          className={styles.input}
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        <Link
          href={Route.SIGNUP}
          className={styles.navigationLink}>{`I don't have account yet.`}</Link>
        <Button type="submit" variant="secondary">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
