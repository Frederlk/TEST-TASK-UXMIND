'use server';

import type { InputType, ReturnType } from './types';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/create-safe-action';
import { authOptions } from '@/lib/auth';

import { CreateComment } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { message, taskId } = data;
  const userId = session.user.id;
  let comment;

  try {
    comment = await db.comment.create({
      data: {
        userId,
        message,
        taskId,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create.',
    };
  }

  revalidatePath(`/board/task/${taskId}`);
  return { data: comment };
};

export const createComment = createSafeAction(CreateComment, handler);
