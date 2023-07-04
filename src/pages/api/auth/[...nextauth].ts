import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInUser, signOutUser } from '../../../services/AuthService';
import { Route } from '../../../constants/Route';

export default NextAuth({
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
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: Route.SIGNIN
  },

  events: {
    signOut: async () => {
      await signOutUser();
    }
  }
});
