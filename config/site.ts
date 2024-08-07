import { SiteConfig } from '@/types';
import { env } from '@/env.js';

export const siteConfig: SiteConfig = {
  name: 'Urban Rhetoric',
  description:
    'An open source MDX blog application built using Nextjs 14, server component, authjs, tailwind, and shadcn ui',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    github: 'https://github.com/devchaudhary24k/UrbanRhetoric',
    twitter: 'https://twitter.com/dev_talan',
  },
};
