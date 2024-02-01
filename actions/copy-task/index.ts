'use server';

import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { CopyTask } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id } = data;
  let task;

  try {
    const taskToCopy = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskToCopy) {
      return { error: 'Task not found' };
    }

    task = await db.task.create({
      data: {
        title: `${taskToCopy.title} - Copy`,
        description: taskToCopy.description,
        userId: session?.user.id,
        startDate: taskToCopy.startDate,
        endDate: taskToCopy.endDate,
        repoId: taskToCopy.repoId,
        repoName: taskToCopy.repoName,
        status: taskToCopy.status,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to copy.',
    };
  }

  return { data: task };
};

export const copyTask = createSafeAction(CopyTask, handler);
