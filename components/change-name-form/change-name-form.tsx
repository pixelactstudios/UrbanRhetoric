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

type UserNameFormProps = HTMLAttributes<HTMLFormElement> & {
  user: Pick<User, 'name'>;
};

type FormData = z.infer<typeof ChangeNameSchema>;

export function ChangeNameForm({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(ChangeNameSchema),
    defaultValues: {
      name: user.name ?? '',
    },
  });

  const { handleSubmit } = form;

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { mutate } = api.user.changeName.useMutation({
    onSuccess: () => {
      toast.success('Name changed');
      setIsSaving(false);
    },
    onError: () => {
      toast.error('User name not changed due to some error');
      setIsSaving(false);
    },
  });

  async function onSubmit(data: FormData) {
    // change name function
    setIsSaving(true);

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
            <CardTitle>Your Name</CardTitle>
            <CardDescription>
              Please enter your full name or a display name you are comfortable
              with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="name"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
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
