import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import WorkInProgress from '@/public/work-in-progress.svg';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { Board } from '@/components/board/board';
import { TaskForm } from '@/components/board/task-form';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex flex-col-reverse items-center justify-center w-full gap-8 p-5 pt-32 mx-auto w-sceen max-w-7xl md:flex-row">
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
    <main className="flex flex-col-reverse items-start w-full h-full gap-8 p-5 mx-auto max-w-7xl md:flex-row">
      <Board />
      <div className="flex items-center justify-center w-full p-4 min-h-80 bg-foreground">
        {/* <p className="text-white">No task selected</p> */}
        <TaskForm />
      </div>
    </main>
  );
}
