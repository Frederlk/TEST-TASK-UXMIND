import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { TaskStatus } from '@prisma/client';

import { db } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { Filters } from '@/hooks/use-filters';
import { SearchByFilters } from '@/lib/filters';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const filters: Filters = data.data;
    const userId = session.user.id || '';
    const query = filters.query;
    const searchByDescription = filters.fields.includes(SearchByFilters.DESCRIPTION);
    const searchByTitle = filters.fields.includes(SearchByFilters.TITLE);

    const tasks = await db.task.findMany({
      where: {
        userId,
        status: { in: filters.statuses as TaskStatus[] },
        ...(!!query
          ? {
              OR: [
                {
                  title: {
                    contains: searchByTitle ? query : undefined,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: searchByDescription ? query : undefined,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        endDate: true,
        startDate: true,
        userId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!tasks.length) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
