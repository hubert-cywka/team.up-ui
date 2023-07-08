import SignInForm from 'components/forms/sign-in-form/SignInForm';
import { signIn } from 'next-auth/react';
import { SignInRequest } from 'shared/interfaces/SignInRequest.interface';
import Builder, { BuilderStatus } from 'shared/utility/Builder';
import Alert from 'components/primitives/alert/Alert';
import { useState } from 'react';
import { Route } from 'shared/constants/Route';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { checkIfShouldRedirect } from 'shared/utility/RouteUtils';
import CenteredLayout from 'layouts/error/CenteredLayout';

const SignIn = () => {
  const router = useRouter();
  const [status, setStatus] = useState<BuilderStatus>('idle');

  const handleSignIn = async (request: SignInRequest) => {
    setStatus('loading');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: request.email,
        password: request.password
      });

      if (res?.status === 200) {
        setStatus('success');
        await router.push(Route.HOME);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <CenteredLayout>
      <SignInForm onSignIn={handleSignIn} />
      {Builder.createResult(status)
        .onError(
          <Alert content="User with this email and password was not found." variant="error" />
        )
        .onSuccess(<Alert content="Success! You will be redirected soon." variant="success" />)
        .build()}
    </CenteredLayout>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverSession = await getServerSession(
    context.req,
    context.res,
    authOptions(context.req as NextApiRequest, context.res as NextApiResponse)
  );

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
