import { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import 'next-auth';

type UserId = string;

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    };
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // id: UserId;
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}
