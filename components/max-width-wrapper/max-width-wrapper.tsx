// Global Imports
import { ReactNode } from 'react';

// Internal Imports
import { cn } from '@/lib/utils';

// Types

type Props = {
  children: ReactNode;
  className?: string;
};

// Component
const MaxWidthWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-2xl px-2.5 md:px-20',
        className
      )}
    >
      {children}
    </div>
  );
};

// Exports
export default MaxWidthWrapper;
