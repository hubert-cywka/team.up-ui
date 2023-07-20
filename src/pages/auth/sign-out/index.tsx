import { Route } from 'shared/constants/Route';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import MessageBox from 'components/structure/message-box/MessageBox';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import CenteredLayout from 'layouts/error/CenteredLayout';
import withAuth from 'components/hoc/with-auth/WithAuth';

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut({ redirect: false });
    })();
  }, []);

  return (
    <CenteredLayout>
      <MessageBox
        icon={faHandPointUp}
        header="See you later!"
        message="You have been signed out. We hope that you come back soon!"
        onButtonClick={() => router.push(Route.SIGN_IN)}
        buttonText="Sign in"
        variant="success"
      />
    </CenteredLayout>
  );
};

export default SignOut;

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'unauthenticated');
