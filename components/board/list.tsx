import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { TaskItem } from './task-item';

export const List = async () => {
  const session = await getServerSession(authOptions);

  const tasks = await db.task.findMany({
    where: {
      userId: session?.user?.id as string,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
