import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import { NextAuthProvider } from '@components/providers/next-auth-provider';
import { QueryProvider } from '@components/providers/query-provider';
import { ModalProvider } from '@components/providers/modal-provider';

import { Toaster } from '@ui/toaster';

import { cn } from '@lib/utils';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DayTask',
  description: 'DayTask - a test todo app task for UXMind',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('bg-secondary-foreground', inter.className)}>
        <NextAuthProvider>
          <QueryProvider>
            {children}
            <Toaster />
            <ModalProvider />
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
