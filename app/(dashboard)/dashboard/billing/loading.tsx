// Global Imports

// Internal Imports
import { DashboardShell } from '@/components/shell/shell';
import { DashboardHeader } from '@/components/header/header';
import { CardSkeleton } from '@/components/card-skeleton/card-skeleton';

// Component
const DashboardBillingLoading = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan"
      />
      <div className="grpd gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
};

// Exports
export default DashboardBillingLoading;
