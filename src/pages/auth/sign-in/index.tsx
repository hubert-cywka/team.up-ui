import SignInForm from 'components/auth/sign-in-form/SignInForm';
import { SignInRequest } from '@shared/types/Auth';
import Builder from '@shared/utility/Builder';
import Alert from '@components/primitives/alert/Alert';
import { GetServerSideProps } from 'next';
import CenteredLayout from '@layouts/error/CenteredLayout';
import withAuth from '@components/hoc/with-auth/WithAuth';
import { useSignIn } from '@shared/hooks/auth/useSignIn';

const SignIn = () => {
  const { signIn, status } = useSignIn();

  const handleSignIn = async (request: SignInRequest) => {
    try {
      await signIn({
        email: request.email,
        password: request.password
      });
    } catch (e) {
      /* empty */
    }
  };

  return (
    <CenteredLayout>
      <SignInForm onSubmit={handleSignIn} />
      {Builder.createResult(status)
        .onError(
          <Alert message="User with this email and password was not found." variant="error" />
        )
        .onSuccess(<Alert message="Success! You will be redirected soon." variant="success" />)
        .build()}
    </CenteredLayout>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'authenticated');
