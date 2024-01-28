'use server';

import type { InputType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-action';
import { authOptions } from '@/lib/auth';

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
        status: taskToCopy.status,
        progress: taskToCopy.progress,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to copy.',
    };
  }

  revalidatePath(`/board`);
  return { data: task };
};

export const deleteCard = createSafeAction(CopyTask, handler);
