'use client';

import type { Task, TaskStatus } from '@prisma/client';

import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { Badge, badgeVariants } from '@ui/badge';
import { toast } from '@ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Spinner } from '@ui/spinner';

import { taskStatusToBadgeVariant, taskStatusToText } from '@lib/task-status';
import { STATUS_ITEMS } from '@lib/filters';

import { updateTaskStatus } from '@actions/update-task-status';

import { useAction } from '@hooks/use-action';

export const TaskStatusBadge = ({ task, isEdit }: { task: Task; isEdit?: boolean }) => {
  const session = useSession();
  const queryClient = useQueryClient();

  const { execute: executeUpdateStatus, isLoading: isUpdating } = useAction(updateTaskStatus, {
    onSuccess: () => {
      toast({
        title: `Task status updated`,
      });
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const unUpdateStatus = (value?: string) => {
    executeUpdateStatus({
      id: task.id,
      status: value as TaskStatus,
    });
  };

  const badge = (
    <Badge variant={taskStatusToBadgeVariant[task.status]}>{taskStatusToText[task.status]}</Badge>
  );

  const userIsAuthor = task.userId === session?.data?.user.id;
  if (!isEdit || !userIsAuthor) {
    return <>{badge}</>;
  }

  const options = STATUS_ITEMS.map((item) => (
    <SelectItem key={item.id} value={item.id} className="cursor-pointer">
      {item.label}
    </SelectItem>
  ));

  return (
    <Select value={task.status} onValueChange={(value) => unUpdateStatus(value)}>
      <SelectTrigger className={badgeVariants({ variant: taskStatusToBadgeVariant[task.status] })}>
        {isUpdating ? (
          <Spinner className="h-4 w-4 fill-black" />
        ) : (
          <SelectValue placeholder={taskStatusToText[task.status]} />
        )}
      </SelectTrigger>
      <SelectContent className="w-56" align="end">
        {options}
      </SelectContent>
    </Select>
  );
};
