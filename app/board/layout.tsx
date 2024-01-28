import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

import { Board } from '@/components/board/board';
import { Separator } from '@/components/ui/separator';
import { Public } from '@/components/home/public';
import { authOptions } from '@/lib/auth';

export default async function BoardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <main className="space-y-6 md:space-y-0 md:w-full md:py-5 md:flex md:items-start md:h-screen md:mx-auto md:overflow-hidden md:max-w-7xl">
      <div className="md:h-full md:px-5 md:basis-2/5 md:overflow-y-auto md:shrink-0 md:scrollbar-thin md:scrollbar-thumb-primary md:scrollbar-track-transparent">
        {session ? <Board user={session.user} /> : <Public />}
      </div>

      <Separator orientation="horizontal" className="bg-neutral-400 md:h-full md:w-[1px]" />

      <div className="md:w-full md:h-full md:px-5 md:overflow-y-auto md:scrollbar-thin md:scrollbar-thumb-primary md:scrollbar-track-transparent">
        {children}
      </div>
    </main>
  );
}
