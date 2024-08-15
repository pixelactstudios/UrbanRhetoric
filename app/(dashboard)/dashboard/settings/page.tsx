import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
import { DashboardHeader } from '@/components/header/header';
import { DashboardShell } from '@/components/shell/shell';
import { ChangeNameForm } from '@/components/change-name-form/change-name-form';
import { type Metadata } from 'next';
import { HydrateClient } from '@/trpc/server';
import { ChangePasswordForm } from '@/components/change-password-form/change-password-form';
import { SetPasskeyForm } from '@/components/set-passkey-form/set-passkey-form';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <HydrateClient>
      <DashboardShell>
        <DashboardHeader
          heading="Settings"
          text="Manage account and website settings."
        />
        <div className="grid gap-10">
          <ChangeNameForm user={{ name: user!.name ?? '' }} />
        </div>
        <div className="grid gap-10">
          <ChangePasswordForm />
        </div>
        <div className="grid gap-10">
          <SetPasskeyForm />
        </div>
      </DashboardShell>
    </HydrateClient>
  );
}
