/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', 'auth'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect login users to settings.
 * @type {string[]}
 */
export const authRoutes = [
  '/login',
  '/signup',
  '/auth/error',
  'auth/reset',
  'auth/new-password',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The prefix for API TRPC routes.
 * Routes that start with this prefix are used for TRPC API.
 * @type {string}
 */
export const apiTRPCPrefix = '/api/trpc';

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
