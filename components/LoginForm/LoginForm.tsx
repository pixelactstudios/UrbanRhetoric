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
    </div>
  );
};

// Exports
export default LoginForm;
