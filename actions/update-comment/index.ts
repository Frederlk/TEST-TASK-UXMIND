'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { UpdateComment } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, taskId, userId, message } = data;
  let comment;

  if (session?.user.id !== userId) {
    return {
      error: 'Unauthorized',
    };
  }

  try {
    comment = await db.comment.update({
      where: {
        id,
        taskId,
      },
      data: {
        message,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update.',
    };
  }

  revalidatePath(`/board/task/${taskId}`);
  return { data: comment };
};

export const updateComment = createSafeAction(UpdateComment, handler);
