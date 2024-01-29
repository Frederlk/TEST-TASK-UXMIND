'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';

import { TaskDetails } from '@/components/task/task-details';
import { FullTask } from '@/types';
import { NotFound } from '@/components/not-found';
import { Spinner } from '@/components/ui/spinner';

export default function TaskIdPage() {
  const params = useParams();
  const taskId = params.taskId as string;

  const {
    data: task,
    isLoading,
    error,
  } = useQuery<FullTask, AxiosError>({
    queryKey: ['task', taskId],
    retry: 1,
    queryFn: async () => {
      const response = await axios.get(`/api/tasks/${taskId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <NotFound status={error.response?.status} title={error.response?.statusText} />;
  }

  if (task) {
    return <TaskDetails task={task} />;
  }

  return <NotFound status="404" title="Task Not Found" />;
}
