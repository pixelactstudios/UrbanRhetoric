import * as z from 'zod';

export const PostDeleteSchema = z.object({
  postId: z.string().min(1),
});
