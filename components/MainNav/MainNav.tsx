// Global Imports
import Link from 'next/link';

// Internal Imports
import { MainNavItem } from '@/types';
import { Icons } from '@/components/Icons/Icons';
import { siteConfig } from '@/config/site';

// Types
type NavbarLinksProps = {
  items?: MainNavItem[];
  children?: React.ReactNode;
};

// Component
const MainNav = ({ children, items }: NavbarLinksProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        rel="stylesheet"
        href="/"
        className="hidden items-center md:flex space-x-2"
      >
        <Icons.logo className="w-14 h-14" />
        <span className="hidden">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items.map((item, index) => (
            <Link key={index} href={item.disabled ? '#' : item.href}>
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
};

// Exports
export default MainNav;
