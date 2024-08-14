import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Credentials from 'next-auth/providers/credentials';
import {
  apiAuthPrefix,
  apiTRPCPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes';
import { LoginSchema } from '@/lib/validations/auth';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/server/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user) return null;
          if (!user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          console.log(user);
          console.log(passwordMatch);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Routes setup
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isApiTRPCRoute = nextUrl.pathname.startsWith(apiTRPCPrefix);

      // Bypass for auth api, trpc api, and public routes
      if (isApiAuthRoute) return true;
      if (isApiTRPCRoute) return true;
      if (isPublicRoute) return true;

      if (isAuthRoute) {
        // if auth route and user logged in, send user to DEFAULT_LOGIN_REDIRECT
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true; // Allow access to the login page
      }

      if (!isPublicRoute) {
        // if private route and user logged, allow user
        if (isLoggedIn) return true;
        // if private route and user is not authenticated
        if (!isLoggedIn) {
          let callbackUrl = nextUrl.pathname;
          if (nextUrl.search) {
            callbackUrl += nextUrl.search;
          }
          // Encode the call back Url
          const encodedCallbackUrl = encodeURIComponent(callbackUrl);
          // Return the user to login page with callback
          return Response.redirect(
            new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
          );
        }
      }

      if (!isPublicRoute && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(
          new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
      }

      return true;
    },

    async session({ session, token }) {
      if (session) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await getUserByEmail(token.email!);

      if (!dbUser) {
        if (user) {
          token.id = user.id!;
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
});
