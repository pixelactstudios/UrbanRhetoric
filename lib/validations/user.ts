import * as z from 'zod';

export const ChangeNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const VerifyUser = z.object({
  email: z.string().email(),
});
