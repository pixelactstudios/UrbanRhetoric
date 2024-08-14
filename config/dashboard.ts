import { type DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Post',
      href: '/dashboard',
      icon: 'post',
    },
    {
      title: 'Billing',
      href: '/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: 'settings',
    },
  ],
};
