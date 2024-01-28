'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { fetcher } from '@/lib/fetcher';
import { TaskDetails } from '@/components/board/task-details';
import { FullTask } from '@/types';

export default function TaskIdPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const { data: task } = useQuery<FullTask>({
    queryKey: ['task', taskId],
    queryFn: () => fetcher(`/api/tasks/${taskId}`),
  });

  return task ? <TaskDetails task={task} /> : <TaskDetails.Skeleton />;
}
