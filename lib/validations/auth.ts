import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export const VerifyUser = z.object({
  email: z.string().email(),
});

export const PostDeleteSchema = z.object({
  postId: z.string().min(1),
});
