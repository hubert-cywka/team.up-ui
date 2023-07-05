import SignInForm from 'components/forms/sign-in-form/SignInForm';
import MainLayout from 'layouts/main/MainLayout';
import { signIn } from 'next-auth/react';
import { SignInRequest } from '../../services/AuthService';
import Builder from '../../shared/utility/Builder';
import Alert from '../../components/primitives/alert/Alert';
import { useState } from 'react';
import { Route } from '../../constants/Route';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { checkIfShouldRedirect } from '../../shared/utility/RouteUtils';

const SignIn = () => {
  const router = useRouter();
  const [statusCode, setStatusCode] = useState(0);

  const handleSignIn = async (request: SignInRequest) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: request.email,
      password: request.password
    });

    const errorStatusCode = res?.status ? res.status : 500;
    setStatusCode(errorStatusCode);

    if (res?.status === 200) {
      await router.push(Route.HOME);
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

  const mapCodeToStatus = (code: number) => {
    if (code === 200) {
      return 'success';
    } else if (code >= 400) {
      return 'error';
    } else {
      return 'idle';
    }
  };

  return (
    <MainLayout>
      <SignInForm onSignIn={handleSignIn} />
      {Builder.createResult(mapCodeToStatus(statusCode))
        .onError(<Alert content={buildErrorMessage(statusCode)} variant="error" />)
        .onSuccess(<Alert content="Success! You will be redirected soon." variant="success" />)
        .build()}
    </MainLayout>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverSession = await getServerSession(context.req, context.res, authOptions);

  if (serverSession && checkIfShouldRedirect('authenticated', serverSession.user)) {
    return {
      redirect: {
        destination: Route.HOME,
        permanent: false
      }
    };
  }

  return {
    props: {
      session: serverSession
    }
  };
};
