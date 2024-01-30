import { NextResponse } from 'next/server';

import { db } from '@lib/db';

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const task = await db.task.findUnique({
      where: {
        id: params.taskId,
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

    return NextResponse.json(task);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
