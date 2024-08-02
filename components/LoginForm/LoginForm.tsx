'use client';

// Global Imports
import { HTMLAttributes, useState } from 'react';
import z from 'zod';

// Internal Imports
import { userAuthSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/Icons/Icons';

// Types
type LoginFormProps = HTMLAttributes<HTMLDivElement> & {};
type FormData = z.infer<typeof userAuthSchema>;

// Component
const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isPasskeyLoading, setIsPasskeyLoading] = useState<boolean>(false);
  // const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    //   TODO: Sign-in Function

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div className="mb-4 flex flex-col gap-2">
                {/* Email */}
                <Label className="" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  placeholder="name@example.com"
                  disabled={isLoading || isGithubLoading}
                  {...register('email')}
                />
              </div>
              <div className="mb-4 flex flex-col gap-2">
                {/* Password */}
                <Label className="mb-2" htmlFor="email">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  placeholder="**********"
                  disabled={isLoading || isGithubLoading}
                  {...register('password')}
                />
              </div>
            </div>
            <button className={buttonVariants()} disabled={isLoading}>
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
          onClick={() => {
            setIsGithubLoading(true);
            //   TODO: Github login
          }}
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
          onClick={() => {
            setIsPasskeyLoading(true);
            //   TODO: Github login
          }}
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
