import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const testRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return [1, 2, 3];
  }),
});
