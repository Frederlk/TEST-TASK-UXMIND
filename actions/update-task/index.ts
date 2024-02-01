'use server';

import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { UpdateTask } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, ...values } = data;
  let task;

  try {
    task = await db.task.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update.',
    };
  }

  return { data: task };
};

export const updateTask = createSafeAction(UpdateTask, handler);
