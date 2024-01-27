import { getServerSession } from 'next-auth';

import { Board } from '@/components/board/board';
import { TaskForm } from '@/components/board/task-form';
import { Separator } from '@/components/ui/separator';
import { authOptions } from '@/lib/auth';
import { EmptyTask } from '@/components/board/empty-task';

export default async function BoardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col-reverse items-start w-full h-full gap-5 p-5 mx-auto max-w-7xl md:flex-row">
      <Board user={session?.user} />
      <Separator orientation="vertical" className="bg-neutral-400" />
      {session?.user ? <TaskForm user={session?.user} /> : <EmptyTask />}
    </main>
  );
}
