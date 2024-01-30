'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { UpdateTaskStatus } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, status } = data;
  let task;

  try {
    task = await db.task.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update status.',
    };
  }

  revalidatePath(`/board/task/${id}`);
  return { data: task };
};

export const updateTaskStatus = createSafeAction(UpdateTaskStatus, handler);
