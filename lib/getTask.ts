import { db } from './db';

export const getTask = async (taskId: string) =>
  await db.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          taskId: true,
          message: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });
