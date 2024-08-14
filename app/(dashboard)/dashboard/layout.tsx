// Global Imports
import { type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import MainNav from '@/components/main-nav/main-nav';
import { dashboardConfig } from '@/config/dashboard';
import UserAccountNav from '@/components/user-account-nav/user-account-nav';
import { getCurrentUser } from '@/lib/session';
import DashboardNav from '@/components/nav/nav';
import { SiteFooter } from '@/components/site-footer/site-footer';

// Internal Imports

// Types

type DashboardLayoutProps = {
  children?: ReactNode;
};

// Component
const Layout = async ({ children }: DashboardLayoutProps) => {
  // TODO: Set user in dashboard layout
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="stickey top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              email: user.email,
              image: user.image,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
};

// Exports
export default Layout;
