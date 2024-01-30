'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@lib/db';
import { createSafeAction } from '@lib/create-safe-action';
import { authOptions } from '@lib/auth';

import type { InputType, ReturnType } from './types';

import { DeleteComment } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, taskId, userId } = data;
  let comment;

  if (session?.user.id !== userId) {
    return {
      error: 'Unauthorized',
    };
  }

  try {
    comment = await db.comment.delete({
      where: {
        id,
        taskId,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to delete.',
    };
  }

  revalidatePath(`/board/task/${taskId}`);
  return { data: comment };
};

export const deleteComment = createSafeAction(DeleteComment, handler);
