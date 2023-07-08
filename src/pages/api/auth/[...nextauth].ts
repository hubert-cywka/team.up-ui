import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInUser, signOutUser } from 'services/AuthService';
import { Route } from 'shared/constants/Route';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions = (req: NextApiRequest, res: NextApiResponse): AuthOptions => {
  return {
    providers: [
      Credentials({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' }
        },

        authorize: async (credentials) => {
          const { data: user, headers } = await signInUser({
            email: credentials?.email ?? '',
            password: credentials?.password ?? ''
          });

          const cookie = headers['set-cookie'];
          if (cookie) {
            res.setHeader('Set-Cookie', cookie);
          }

          return user;
        }
      })
    ],
    session: {
      maxAge: 60 * 60,
      strategy: 'jwt'
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
        }
        return token;
      },

      session({ session, token }) {
        if (token && session.user) {
          session.user.image = null;
          session.user.role = token.role;
        }
        return session;
      }
    },
    pages: {
      signIn: Route.SIGN_IN,
      signOut: Route.SIGN_OUT
    },

    events: {
      signOut: async () => {
        await signOutUser();
      }
    }
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};
