import SignUpForm from 'components/forms/sign-up-form/SignUpForm';
import MainLayout from '../../layouts/main/MainLayout';
import { SignUpRequest } from '../../services/AuthService';
import { useSignUp } from '../../shared/hooks/mutation/useSignUp';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Builder from '../../shared/utility/Builder';
import Alert from '../../components/primitives/alert/Alert';
import StatusMessage from '../../components/content/error-message/StatusMessage';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { mutateAsync: signUp, status } = useSignUp();
  const router = useRouter();
  const [statusCode, setStatusCode] = useState(0);

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
    <MainLayout>
      {status !== 'success' && <SignUpForm onSignUp={handleSignUp} />}
      {Builder.createResult(status)
        .onError(<Alert content={buildErrorMessage(statusCode)} variant="error" />)
        .onSuccess(
          <StatusMessage
            variant="success"
            header="Success!"
            message="We are happy that you joined us! Now you have your own account, so click button below and sign in!"
            buttonText="Sign in"
            onButtonClick={() => router.push('/auth/sign-in')}
            icon={faHeart}
          />
        )
        .build()}
    </MainLayout>
  );
};

export default SignIn;
