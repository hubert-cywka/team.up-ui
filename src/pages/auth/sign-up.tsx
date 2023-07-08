import SignUpForm from 'components/forms/sign-up-form/SignUpForm';
import { SignUpRequest } from 'shared/interfaces/SignUpRequest.interface';
import { useSignUp } from 'shared/hooks/auth/useSignUp';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Builder from 'shared/utility/Builder';
import Alert from 'components/primitives/alert/Alert';
import MessageBox from 'components/content/message-box/MessageBox';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Route } from 'shared/constants/Route';
import CenteredLayout from 'layouts/error/CenteredLayout';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { checkIfShouldRedirect } from '../../shared/utility/RouteUtils';

const SignUp = () => {
  const { mutateAsync: signUp, status } = useSignUp();
  const [statusCode, setStatusCode] = useState(0);
  const router = useRouter();

  const handleSignUp = async (request: SignUpRequest) => {
    try {
      await signUp(request);
    } catch (error) {
      const errorStatusCode =
        error instanceof AxiosError && error.response?.status ? error.response.status : 500;
      setStatusCode(errorStatusCode);
    }
  };

  const buildErrorMessage = (errorStatusCode: number) => {
    switch (errorStatusCode) {
      case 409:
        return 'User with this email already exists.';

      default:
        return 'Unexpected server error happened. Try again later.';
    }
  };

  return (
    <CenteredLayout>
      {status !== 'success' && <SignUpForm onSignUp={handleSignUp} />}
      {Builder.createResult(status)
        .onError(<Alert content={buildErrorMessage(statusCode)} variant="error" />)
        .onSuccess(
          <MessageBox
            variant="success"
            header="Success!"
            message="We are happy that you joined us! Now you have your own account, so click button below and sign in!"
            buttonText="Sign in"
            onButtonClick={() => router.push(Route.SIGN_IN)}
            icon={faHeart}
          />
        )
        .build()}
    </CenteredLayout>
  );
};

export default SignUp;

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
