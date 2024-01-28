import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

import { BoardTaskItem } from './task-item';

export const BoardTaskList = async () => {
  const session = await getServerSession(authOptions);

  const tasks = await db.task.findMany({
    where: {
      userId: session?.user?.id || '',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <BoardTaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
