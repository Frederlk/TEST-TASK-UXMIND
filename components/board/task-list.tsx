'use client';

import { useQuery } from '@tanstack/react-query';
import { Task } from '@prisma/client';

import { NotFound } from '@components/not-found';

import { Spinner } from '@ui/spinner';

import { fetcher } from '@lib/fetcher';

import { useFilters } from '@hooks/use-filters';

import { BoardTaskItem } from './task-item';

export const BoardTaskList = () => {
  const { filters } = useFilters();

  const { data, isLoading, error } = useQuery<Task[]>({
    queryKey: ['task', filters],
    retry: 1,
    queryFn: () =>
      fetcher('/api/search', {
        method: 'POST',
        body: JSON.stringify(filters),
      }),
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data?.length) {
    return <NotFound title="No tasks found" />;
  }

  return (
    <ul className="space-y-2">
      {(data || []).map((task) => (
        <BoardTaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
