'use server';

import type { InputType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import { CreateTask } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, startDate, endDate, repoName, repoId, description } = data;
  const userId = session.user.id;
  let task;

  try {
    task = await db.task.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        repoId,
        repoName,
        userId,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create.',
    };
  }

  revalidatePath(`/board`);
  return { data: task };
};

export const createTask = createSafeAction(CreateTask, handler);
