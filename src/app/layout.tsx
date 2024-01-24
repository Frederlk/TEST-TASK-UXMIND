import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import { NextAuthProvider } from './_providers';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'UXMind Todo App',
  description: 'Test Task: Todo App for UXMind',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
