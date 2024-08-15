'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { cn } from '@/lib/utils';
import { ChangeNameSchema } from '@/lib/validations/user';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { type HTMLAttributes, useState } from 'react';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
import { ChangePasswordSchema } from '@/lib/validations/password';

type ChangePasswordFormProps = HTMLAttributes<HTMLFormElement>;

type FormData = z.infer<typeof ChangePasswordSchema>;

export function ChangePasswordForm({
  className,
  ...props
}: ChangePasswordFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const { handleSubmit, reset } = form;

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { mutate } = api.user.changePassword.useMutation({
    onSuccess: (data) => {
      toast.success(data?.success);
      setIsSaving(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsSaving(false);
      reset();
    },
  });

  async function onSubmit(data: FormData) {
    // change name function
    mutate(data);
  }

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              You can change your current password from here if you want to
              change it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        id="current-password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        placeholder="********"
                        disabled={isSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        id="new-password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        placeholder="********"
                        disabled={isSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="repeatNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        id="repeat-new-password"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        placeholder="********"
                        disabled={isSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={isSaving}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
