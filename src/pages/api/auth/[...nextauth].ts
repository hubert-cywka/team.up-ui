import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInUser, signOutUser } from 'services/AuthService';
import { Route } from 'shared/constants/Route';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },

      authorize: async (credentials) => {
        const user = await signInUser({
          email: credentials?.email ?? '',
          password: credentials?.password ?? ''
        });

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      }
    })
  ],
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

export default NextAuth(authOptions);