import styles from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { Input } from '@mui/material';
import Button from '@/components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { RouteConstants } from '@/constants/RouteConstants';

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
    <div className={styles['sign-in-form-container']}>
      <form className={styles['sign-in-form']} onSubmit={handleSubmit(handleSignIn)}>
        <Input
          startAdornment={<FontAwesomeIcon className={styles['input-icon']} icon={faAt} />}
          className={styles['input']}
          {...register('email')}
          type="email"
          disableUnderline
          placeholder="E-mail"
        />
        <Input
          startAdornment={<FontAwesomeIcon className={styles['input-icon']} icon={faLock} />}
          className={styles['input']}
          {...register('password')}
          type="password"
          disableUnderline
          placeholder="Password"
        />
        <Link
          href={RouteConstants.SIGNUP}
          className={styles['navigation-link']}>{`I don't have account yet.`}</Link>
        <Button type="submit" variant="secondary">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
