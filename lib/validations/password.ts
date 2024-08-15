import * as z from 'zod';

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(1),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters long.' })
      .regex(/(?=.*[A-Z])/, {
        message: 'New password must contain at least one uppercase letter.',
      })
      .regex(/(?=.*[0-9])/, {
        message: 'New password must contain at least one number.',
      })
      .regex(/(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/`~|\\-])/, {
        message: 'New password must contain at least one special character.',
      }),
    repeatNewPassword: z.string().min(6, {
      message: 'Repeat new password must be at least 6 characters long.',
    }),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'Passwords does not match.',
    path: ['repeatNewPassword'], // Path to the field where the error should be shown
  });
