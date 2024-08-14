import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { PostDeleteSchema } from '@/lib/validations/auth';

export const postRouter = createTRPCRouter({
  getAllPosts: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      where: { authorId: ctx.session.user.id },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }),

  deletePost: protectedProcedure
    .input(PostDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.postId,
        },
      });
    }),
});
