import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

import { TaskForm } from '@components/task/task-form';

import { authOptions } from '@lib/auth';

export default async function TaskFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-x-8 text-white">
        <h2>Create New Task</h2>
        <Link href="/board" className="transition hover:text-destructive">
          <X className="h-6 w-6 " />
        </Link>
      </div>
      <TaskForm />
    </div>
  );
}
