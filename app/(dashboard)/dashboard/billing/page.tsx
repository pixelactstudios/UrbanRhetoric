// Global Imports

// Internal Imports

import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/session';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage billing and your subscription plan.',
};

// Component
const BillingPage = async () => {
  const user = getCurrentUser();
  return <div>BillingPage</div>;
};

// Exports
export default BillingPage;
