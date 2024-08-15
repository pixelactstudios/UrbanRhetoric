'use client';

// Global Imports
import { type HTMLAttributes, useState } from 'react';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { signIn as passkeySignIn } from 'next-auth/webauthn';
import { useRouter } from 'next/navigation';
import { TRPCClientError } from '@trpc/client';
import { toast } from 'sonner';

// Internal Imports
import { LoginSchema } from '@/lib/validations/auth';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { api } from '@/trpc/react';
import bcrypt from 'bcryptjs';

// Types
type LoginFormProps = HTMLAttributes<HTMLDivElement> & {};
type FormData = z.infer<typeof LoginSchema>;

// Component
const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const router = useRouter();

  /**
   * Initialization of Form.
   * Form is resolved with zod resolver which takes Login Schema.
   * Form is also populated with default values.
   */
  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * form is destructed and handleSubmit and reset functions are extracted out of form.
   * handleSubmit: Used to handle submit function when form action is triggered.
   * reset: reset function is called to clear all data which is currently placed in the form.
   */
  const { handleSubmit, reset } = form;

  // Different states which disable form fields when required.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState<boolean>(false);
  // const searchParams = useSearchParams();

  /**
   *
   */
  const { mutateAsync: verifyUser } = api.user.verifyUser.useMutation();

  async function onSubmit(data: FormData) {
    // setIsLoading(true);
    const { email, password } = data;

    try {
      // Await the result from verifyUser
      const result = await verifyUser({ email });

      const verifiedEmail = result.email;

      if (verifiedEmail) {
        // Try signing in with credentials
        const signInResult = await signIn('credentials', {
          email: verifiedEmail,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          // Handle authentication errors
          if (signInResult.error === 'CredentialsSignin') {
            toast.error('Invalid Credentials');
          } else {
            toast.error('Something went wrong');
          }
        } else if (signInResult?.ok) {
          // Handle successful authentication
          toast.success('Successfully authenticated');
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      }
    } catch (error) {
      // Handle errors from verifyUser mutation
      if (error instanceof TRPCClientError) {
        toast.error(error.message || 'User does not exist');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      reset();
      setIsLoading(false);
    }
  }

  async function githubSignin() {
    setIsGithubLoading(true);
    const signInResult = await signIn('github', {
      redirect: false,
    });

    console.log(signInResult);

    if (signInResult?.error) {
      // Handle authentication errors
      if (signInResult.error) {
        toast.error(signInResult.error);
      } else {
        toast.error('Something went wrong');
      }
    } else if (signInResult?.ok) {
      // Handle successful authentication
      toast.success('Successfully authenticated');
      router.push(DEFAULT_LOGIN_REDIRECT);
    }
    setIsGithubLoading(false);
  }

  async function passkeySignInFunction() {
    setIsPasskeyLoading(true);
    await passkeySignIn('passkey');
    setIsPasskeyLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div className="mb-4 flex flex-col gap-2">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          placeholder="name@example.com"
                          disabled={
                            isLoading || isGithubLoading || isPasskeyLoading
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          placeholder="********"
                          disabled={
                            isLoading || isGithubLoading || isPasskeyLoading
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <button
              className={buttonVariants()}
              disabled={isLoading || isGithubLoading || isPasskeyLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}{' '}
              Sign In
            </button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline' }))}
          onClick={githubSignin}
          disabled={isLoading || isGithubLoading || isPasskeyLoading}
        >
          {isGithubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{' '}
          Github
        </button>
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline' }))}
          onClick={passkeySignInFunction}
          disabled={isLoading || isGithubLoading || isPasskeyLoading}
        >
          {isPasskeyLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.passkey className="mr-2 h-4 w-4" />
          )}{' '}
          Sign in with Passkey
        </button>
      </div>
    </div>
  );
};

// Exports
export default LoginForm;
