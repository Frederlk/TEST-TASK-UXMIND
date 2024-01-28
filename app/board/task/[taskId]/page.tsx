'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { fetcher } from '@/lib/fetcher';
import { TaskDetails } from '@/components/task/task-details';
import { FullTask } from '@/types';
import { NotFound } from '@/components/not-found';
import { Spinner } from '@/components/ui/spinner';

export default function TaskIdPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const { data: task, isLoading } = useQuery<FullTask>({
    queryKey: ['task', taskId],
    queryFn: () => fetcher(`/api/tasks/${taskId}`),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (task) {
    return <TaskDetails task={task} />;
  }

  return <NotFound status="404" title="Task Not Found" />;
}
