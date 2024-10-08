'use client';

// Global Imports
import Link from 'next/link';
import { ReactNode, useState } from 'react';

// Internal Imports
import { MainNavItem } from '@/types';
import { Icons } from '@/components/icons/icons';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useSelectedLayoutSegment } from 'next/navigation';
import MobileNav from '@/components/mobile-nav/mobile-nav';

// Types
type NavbarLinksProps = {
  items?: MainNavItem[];
  children?: ReactNode;
};

// Component
const MainNav = ({ children, items }: NavbarLinksProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        rel="stylesheet"
        href="/"
        className="hidden items-center justify-center md:flex space-x-2 p-2 rounded-md "
      >
        <Icons.logo className="w-10 h-10" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};

// Exports
export default MainNav;
