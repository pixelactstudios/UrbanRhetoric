'use client';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/trpc/queryClient';
import {
  createTRPCReact,
  loggerLink,
  unstable_httpBatchStreamLink,
} from '@trpc/react-query';
import { AppRouter } from '@/server/api/root';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { ReactNode, useState } from 'react';
import SuperJSON from 'superjson';
import { env } from '@/env.mjs';
import * as child_process from 'node:child_process';

let clientQuertClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    //   Server: always make a new query client
    return createQueryClient();
  }

  //   Browser: use singleton pattern to keep the same query client
  return (clientQuertClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc`,
          headers: () => {
            const headers = new Headers();
            headers.set('x-trpc-source', 'nextjs-react');
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}