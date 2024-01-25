import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

import LogoFull from '@/public/logo-full.svg';
import { authOptions } from '@/lib/auth';

import { UserNav } from './user-nav';

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed w-full">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="text-3xl font-bold">
          <Image src={LogoFull} alt="logo" className="object-contain" />
        </Link>
        {session?.user ? <UserNav user={session?.user} /> : null}
      </div>
    </div>
  );
};
