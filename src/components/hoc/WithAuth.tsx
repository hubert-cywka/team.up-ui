import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { checkIfShouldRedirect } from 'shared/utility/RouteUtils';
import { Route } from 'shared/constants/Route';
import { UserType } from 'shared/types/User';

export const withAuth = async (
  context: GetServerSidePropsContext,
  restrictedUserType: UserType,
  redirectTo: string = Route.HOME
) => {
  const serverSession = await getServerSession(
    context.req,
    context.res,
    authOptions(context.req as NextApiRequest, context.res as NextApiResponse)
  );

  const shouldRedirect = (() => {
    switch (restrictedUserType) {
      case 'authenticated':
      case 'authenticated_user':
      case 'authenticated_admin':
        return serverSession && checkIfShouldRedirect(restrictedUserType, serverSession.user);

      case 'unauthenticated':
        return checkIfShouldRedirect(restrictedUserType, serverSession?.user);
    }
  })();

  if (shouldRedirect) {
    return {
      redirect: {
        destination: redirectTo,
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

export default withAuth;
