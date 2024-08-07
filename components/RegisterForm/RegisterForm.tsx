'use client';

// Global Imports
import { HTMLAttributes, useState } from 'react';
import z from 'zod';

// Internal Imports
import { RegisterSchema } from '@/lib/validations/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/Icons/Icons';

// Types
type RegisterFormProps = HTMLAttributes<HTMLDivElement> & {};
type FormData = z.infer<typeof RegisterSchema>;

// Component
const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
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

    //   TODO: Register Function

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div className="mb-4 flex flex-col gap-2">
                {/* Username */}
                <Label className="" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  placeholder="your name"
                  disabled={isLoading || isGithubLoading}
                  {...register('name')}
                />
              </div>
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
                <Label className="mb-2" htmlFor="password">
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
              Create Account
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
          disabled={isLoading || isGithubLoading}
        >
          {isGithubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{' '}
          Github
        </button>
      </div>
    </div>
  );
};

// Exports
export default RegisterForm;
