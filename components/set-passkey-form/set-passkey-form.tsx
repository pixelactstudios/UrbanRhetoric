'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/icons/icons';
import { type HTMLAttributes, useState } from 'react';
import { signIn } from 'next-auth/webauthn';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
type SetPasskeyFormProps = HTMLAttributes<HTMLDivElement>;

export function SetPasskeyForm({ className, ...props }: SetPasskeyFormProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = api.user.deletePasskey.useMutation({
    onSuccess: () => {
      toast.success('Passkey deleted successfully');
      setIsDeleting(false);
    },
    onError: () => {
      toast.error('Something went wrong');
      setIsDeleting(false);
    },
  });
  const createNewPasskey = async () => {
    setIsLoading(true);
    try {
      await signIn('passkey', { action: 'register' });
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
    setIsLoading(false);
  };

  const deletePasskey = async () => {
    setIsDeleting(true);
    mutate();
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          You can change your current password from here if you want to change
          it.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <button
          onClick={createNewPasskey}
          className={cn(buttonVariants(), className)}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Create new Passkey</span>
        </button>
        <button
          onClick={deletePasskey}
          className={cn(buttonVariants({ variant: 'outline' }), className)}
          disabled={isDeleting}
        >
          {isDeleting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Delete Passkey</span>
        </button>
      </CardContent>
    </Card>
  );
}
