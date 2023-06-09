'use client';

import styles from '../AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import Button from 'primitives/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RouteConstants } from 'constants/RouteConstants';
import SectionHeader from 'primitives/section-header/SectionHeader';
import Input from '../../../primitives/input/Input';

type SignInInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { register, handleSubmit } = useForm<SignInInputs>();

  const handleSignIn = () => {
    console.log('signed in');
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
          href={RouteConstants.SIGNUP}
          className={styles.navigationLink}>{`I don't have account yet.`}</Link>
        <Button type="submit" variant="secondary">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
