import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { TaskForm } from '@/components/board/task-form';
import { authOptions } from '@/lib/auth';

export default async function TaskFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <TaskForm />;
}
