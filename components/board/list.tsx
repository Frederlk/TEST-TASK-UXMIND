import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export const List = async () => {
  const session = await getServerSession(authOptions);

  const tasks = await db.list.findMany({
    where: {
      userId: session?.user?.email as string,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return <ul></ul>;
};
