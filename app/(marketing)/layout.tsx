// Global Imports
import React from 'react';

// Internal Imports
import MainNav from '@/components/MainNav/MainNav';
import { marketingConfig } from '@/config/marketing';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Types
type MarketingLayoutProps = {
  children: React.ReactNode;
};

// Component
const Layout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 py-6 items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'px-6'
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

// Exports
export default Layout;
