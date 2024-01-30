import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { Public } from '@components/public';

import { authOptions } from '@lib/auth';

import WorkInProgress from '@public/work-in-progress.svg';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/board');
  }

  return (
    <main className="w-sceen mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-center gap-8 p-5 lg:flex-row">
      <div className="flex items-center justify-center lg:h-screen lg:w-full">
        <Public />
      </div>

      <div className="flex w-full items-center justify-center bg-white p-4 lg:mb-4">
        <Image src={WorkInProgress} priority className="object-contain" alt="work in progress" />
      </div>
    </main>
  );
}
