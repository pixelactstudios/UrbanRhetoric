import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { RegisterSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { TRPCError } from '@trpc/server';
import { ChangeNameSchema, VerifyUser } from '@/lib/validations/user';
import { ChangePasswordSchema } from '@/lib/validations/password';

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

  changeName: protectedProcedure
    .input(ChangeNameSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          email: ctx.session.user.email!,
        },
        data: {
          name: input.name,
        },
      });
    }),

  changePassword: protectedProcedure
    .input(ChangePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, newPassword } = input;

      const user = await getUserByEmail(ctx.session.user.email!);
      if (!user) return null;
      if (!user.password) return null;

      //   Check current password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Please check your password and try again',
        });
      }

      //   Hash new Password
      const newHashedPassword = await bcrypt.hash(newPassword, 10);

      //   Update new Hashed Password
      await ctx.db.user.update({
        where: {
          email: ctx.session.user.email!,
        },
        data: {
          password: newHashedPassword,
        },
      });
      return { success: 'Password updated successfully' };
    }),

  deletePasskey: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.authenticator.deleteMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    await ctx.db.account.deleteMany({
      where: {
        userId: ctx.session.user.id,
        provider: 'passkey',
      },
    });
  }),
});
