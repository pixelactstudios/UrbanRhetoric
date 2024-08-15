import { CardSkeleton } from '@/components/card-skeleton/card-skeleton';
import { DashboardHeader } from '@/components/header/header';
import { DashboardShell } from '@/components/shell/shell';

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
