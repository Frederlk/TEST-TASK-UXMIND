'use client';

import { TaskStatus } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { taskStatusToBadgeVariant, taskStatusToText } from '@/lib/display-task-status';
import { FullTask } from '@/types';
import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { useAction } from '@/hooks/use-action';
import { updateTaskStatus } from '@/actions/update-task-status';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

export const TaskStatusBadge = ({ task, isEdit }: { task: FullTask; isEdit?: boolean }) => {
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
    console.log('lel');

    executeUpdateStatus({
      id: task.id,
      status: value as TaskStatus,
    });
  };

  const badge = (
    <Badge
      variant={taskStatusToBadgeVariant[task.status]}
      className={cn(isEdit ? 'min-h-14' : 'md:h-container')}
    >
      {taskStatusToText[task.status]}
    </Badge>
  );

  const userIsAuthor = task.userId === session?.data?.user.id;
  if (!isEdit || !userIsAuthor) {
    return <>{badge}</>;
  }

  const options = (Object.keys(TaskStatus) as Array<TaskStatus>).map((key) => (
    <SelectItem key={key} value={key} className="cursor-pointer">
      {taskStatusToText[key]}
    </SelectItem>
  ));

  return (
    <Select defaultValue={task.status} onValueChange={(value) => unUpdateStatus(value)}>
      <SelectTrigger
        className={cn(
          'min-h-14',
          badgeVariants({ variant: taskStatusToBadgeVariant[task.status] }),
        )}
      >
        {isUpdating ? (
          <Spinner className="w-10 h-10 fill-black" />
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
