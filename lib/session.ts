import { auth } from '@/server/auth';

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};
