import SignUpForm from '@components/auth/sign-up-form/SignUpForm';
import { SignUpRequest } from '@shared/types/Auth';
import { useSignUp } from '@shared/hooks/auth/useSignUp';
import { AxiosError } from 'axios';
import Builder from '@shared/utility/Builder';
import Alert from '@components/primitives/alert/Alert';
import MessageBox from '@components/structure/message-box/MessageBox';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Route } from '@shared/constants/Route';
import CenteredLayout from '@layouts/error/CenteredLayout';
import { GetServerSideProps } from 'next';
import withAuth from '@components/hoc/with-auth/WithAuth';

const SignUp = () => {
  const { mutateAsync: signUp, status, error } = useSignUp();
  const router = useRouter();

  const handleSignUp = async (request: SignUpRequest) => {
    try {
      await signUp(request);
    } catch (error) {
      /* empty */
    }
  };

  const buildErrorMessage = (error: AxiosError) => {
    const status = error?.response?.status;
    switch (status) {
      case 409:
        return 'User with this email already exists.';

      default:
        return 'Unexpected server error happened. Try again later.';
    }
  };

  return (
    <CenteredLayout>
      {status !== 'success' && <SignUpForm onSubmit={handleSignUp} />}
      {Builder.createResult(status)
        .onError(<Alert message={buildErrorMessage(error as AxiosError)} variant="error" />)
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

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'authenticated');
