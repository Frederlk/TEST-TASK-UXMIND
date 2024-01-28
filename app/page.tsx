import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import WorkInProgress from '@/public/work-in-progress.svg';
import { authOptions } from '@/lib/auth';
import { Public } from '@/components/home/public';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/board');
  }

  return (
    <main className="flex flex-col-reverse items-center justify-center w-full gap-8 mx-auto w-sceen max-w-7xl md:flex-row">
      <Public />
      <div className="flex items-center justify-center w-full p-4 bg-white md:mb-4">
        <Image src={WorkInProgress} priority className="object-contain" alt="work in progress" />
      </div>
    </main>
  );
}
