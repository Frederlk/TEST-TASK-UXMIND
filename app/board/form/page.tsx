import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

import { TaskForm } from '@/components/task/task-form';
import { authOptions } from '@/lib/auth';

export default async function TaskFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-white gap-x-8">
        <h2>Create New Task</h2>
        <Link href="/board" className="hover:text-red-500">
          <X className="w-6 h-6 " />
        </Link>
      </div>
      <TaskForm />
    </div>
  );
}
