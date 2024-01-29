'use client';

import { useQuery } from '@tanstack/react-query';
import { Task } from '@prisma/client';
import axios, { AxiosError } from 'axios';

import { Spinner } from '@/components/ui/spinner';
import { NotFound } from '@/components/not-found';
import { useFilters } from '@/hooks/use-filters';

import { BoardTaskItem } from './task-item';

export const BoardTaskList = () => {
  const { filters } = useFilters();

  const { data, isLoading, error } = useQuery<Task[], AxiosError>({
    queryKey: ['task', filters],
    retry: 1,
    queryFn: async () => {
      const response = await axios.post('/api/search', { data: filters });
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

  return (
    <ul className="space-y-2">
      {(data || []).map((task) => (
        <BoardTaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
