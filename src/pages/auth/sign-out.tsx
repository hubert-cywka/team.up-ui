import MainLayout from 'layouts/main/MainLayout';
import { Route } from '../../shared/constants/Route';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import MessageBox from '../../components/content/message-box/MessageBox';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut({ redirect: false });
    })();
  }, []);

  return (
    <MainLayout>
      <MessageBox
        icon={faHandPointUp}
        header="See you later!"
        message="You have been signed out. We hope that you come back soon!"
        onButtonClick={() => router.push(Route.SIGN_IN)}
        buttonText="Sign in"
        variant="success"
      />
    </MainLayout>
  );
};

export default SignOut;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverSession = await getServerSession(context.req, context.res, authOptions);

  if (!serverSession) {
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
