import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { RegisterSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { TRPCError } from '@trpc/server';

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;

      // Check if the user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already in use.',
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        //   Create new user
        await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        return { success: 'User Created' };
      } catch (error) {
        // Handle any errors that occur during user creation
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while creating the user',
        });
      }
    }),
});
