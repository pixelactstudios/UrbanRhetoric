'use client';

// Global Imports
import { type HTMLAttributes, useState } from 'react';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Internal Imports
import { RegisterSchema } from '@/lib/validations/auth';
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
import { api } from '@/trpc/react';

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

  //  Form destructure
  const { handleSubmit, reset } = form;

  // States for managing loading states of signup page
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  // Calling TRPC mutation function
  const { mutate } = api.user.register.useMutation({
    // Error handling of TRPC Function
    onError: (error) => {
      setIsLoading(false);
      toast.error(error.message);
    },
    // Success handling of TRPC Function
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success(data.success);
    },
  });

  //  GitHub OAuth signin function
  function githubSignin() {
    setIsGithubLoading(true);

    // TODO: Github signin
  }

  // Form submit function
  function onSubmit(data: FormData) {
    setIsLoading(true);

    // Register Function
    mutate(data);

    // Resets the form after calling Register function
    reset();
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div className="mb-4 flex flex-col gap-2">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          autoCapitalize="none"
                          autoComplete="name"
                          autoCorrect="off"
                          placeholder="Your Name"
                          disabled={isLoading || isGithubLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                          placeholder="Your Name"
                          disabled={isLoading || isGithubLoading}
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
                          disabled={isLoading || isGithubLoading}
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
              disabled={isLoading || isGithubLoading}
              type="submit"
            >
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
          onClick={githubSignin}
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
