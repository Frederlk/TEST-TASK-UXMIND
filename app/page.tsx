import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import WorkInProgress from '@/public/work-in-progress.svg';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex flex-col-reverse items-center justify-center w-full h-screen gap-8 px-6 pt-24 mx-auto w-sceen max-w-7xl md:flex-row">
        <div className="w-full">
          <h1 className="w-full text-5xl font-semibold leading-tight text-white md:w-[400px] md:text-6xl">
            Manage your Task with
            <span className="text-primary"> DayTask</span>
          </h1>
          <Button asChild size="lg" className="w-full mt-12 text-xl font-semibold">
            <Link href="/auth">Let’s Start</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center w-full p-4 bg-white md:mb-4">
          <Image src={WorkInProgress} priority className="object-contain" alt="work in progress" />
        </div>
      </main>
    );
  }

  return (
    <h1 className="w-full text-5xl font-semibold leading-tight text-white md:w-[400px] md:text-6xl">
      {session.user?.name}
    </h1>
  );
}
