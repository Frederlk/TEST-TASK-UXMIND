'use server';

import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { DeleteTask } from './schema';

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
    task = await db.task.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to delete.',
    };
  }

  return { data: task };
};

export const deleteTask = createSafeAction(DeleteTask, handler);
