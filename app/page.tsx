import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Public } from '@/components/home/public';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/board');
  }

  return <Public />;
}
