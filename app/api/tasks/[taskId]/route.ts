import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    if (!task) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
