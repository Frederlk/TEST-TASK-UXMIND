import { ReactNode } from 'react';

import { getServerSession } from 'next-auth';

import { Board } from '@components/board';
import { Public } from '@components/public';

import { Separator } from '@ui/separator';

import { authOptions } from '@lib/auth';

export default async function BoardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <main className="space-y-6 p-5 lg:mx-auto lg:flex lg:h-screen lg:w-full lg:max-w-7xl lg:items-start lg:space-y-0 lg:overflow-hidden">
      <div className="lg:h-full lg:shrink-0 lg:basis-2/5 lg:overflow-y-auto lg:px-5 lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-primary">
        {session?.user ? <Board user={session.user} /> : <Public />}
      </div>

      <Separator orientation="horizontal" className="bg-neutral-400 lg:h-full lg:w-[1px]" />

      <div className="lg:h-full lg:w-full lg:overflow-y-auto  lg:px-5 lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-primary">
        {children}
      </div>
    </main>
  );
}
