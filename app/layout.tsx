import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '../styles/globals.css';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { TRPCReactProvider } from '@/trpc/react';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const roobertMono = localFont({
  src: [
    {
      path: '../assets/fonts/Roobert-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roobert-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roobert-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roobert-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roobert-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Roobert-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-roobert',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Auth.js', 'MDX Blogs'],
  authors: [{ name: 'Pixelact Studios', url: 'https://pixelactstudios.com' }],
  creator: 'Pixelact Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@devtalan',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          fontSans.variable,
          roobertMono.variable
        )}
      >
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative flex flex-col min-h-screen">
              {children}
            </div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
