import type { UserType } from '@/shared/types';

import Link from 'next/link';

import { UserNav } from './user-nav';

export const Navbar = async ({ user }: { user?: UserType }) => (
  <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
    <Link href="/home" className="text-3xl font-bold">
      TO-DO
    </Link>
    <UserNav user={user} />
  </div>
);
