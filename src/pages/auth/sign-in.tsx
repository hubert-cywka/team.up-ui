import SignInForm from 'components/forms/sign-in-form/SignInForm';
import MainLayout from '../../layouts/main/MainLayout';
import { SignInRequest } from '../../services/AuthService';
import { useSignIn } from '../../shared/hooks/useSignIn';
import Builder from '../../shared/utility/Builder';
import Alert from '../../components/primitives/alert/Alert';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { mutateAsync: signIn, status } = useSignIn();
  const router = useRouter();
  const [statusCode, setStatusCode] = useState(0);

  const handleSignIn = async (request: SignInRequest) => {
    try {
      await signIn(request);
      await router.push('/');
    } catch (error) {
      const errorStatusCode =
        error instanceof AxiosError && error.response?.status ? error.response.status : 500;
      setStatusCode(errorStatusCode);
    }
  };

  const buildErrorMessage = (errorStatusCode: number) => {
    switch (errorStatusCode) {
      case 401:
        return 'User with this email and password was not found.';

      default:
        return 'Unexpected server error happened. Try again later.';
    }
  };

  return (
    <MainLayout>
      <SignInForm onSignIn={handleSignIn} />
      {Builder.createResult(status)
        .onError(<Alert content={buildErrorMessage(statusCode)} variant="error" />)
        .onSuccess(<Alert content="Success! You will be redirected soon." variant="success" />)
        .build()}
    </MainLayout>
  );
};

export default SignIn;
