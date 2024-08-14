import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { RegisterSchema, VerifyUser } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { TRPCError } from '@trpc/server';

export const userRouter = createTRPCRouter({
  // Register user API
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;

      // Check if the user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //   Create new user
      await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return { success: 'User Created' };
      //   TODO: Send user a user verification email
    }),

  verifyUser: publicProcedure.input(VerifyUser).mutation(async ({ input }) => {
    const { email } = input;

    const existingUser = await getUserByEmail(email);

    // If user doesn't exists in database return an error
    if (!existingUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User does not exist',
      });
    }

    // If user has no password associated with given email address return an error
    if (!existingUser.password) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'Your account is not associated with password, Please reset your password',
      });
    }

    // TODO: Check if user account is verified or not.
    return { email };
  }),
});
