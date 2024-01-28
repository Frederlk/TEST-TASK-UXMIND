import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/components/providers/next-auth-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
            <div className="flex items-center justify-center p-5 md:w-full md:h-screen">
              {children}
            </div>
            <Toaster />
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
