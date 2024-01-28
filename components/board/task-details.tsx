import Link from 'next/link';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { taskStatusToBadgeVariant, taskStatusToText } from '@/lib/display-task-status';
import { Skeleton } from '@/components/ui/skeleton';
import { FullTask } from '@/types';
import { TaskField } from '@/components/task-details/task-field';
import { Separator } from '@/components/ui/separator';
import { Comments } from '@/components/comments';
import { D_M_Y, D_M_Y_TIME } from '@/constants/date-formats';
import { displayDate } from '@/lib/utils';

export const TaskDetails = ({ task }: { task: FullTask }) => (
  <div className="flex flex-col w-full h-full gap-y-4 ">
    <div className="flex items-start justify-between text-white gap-x-8">
      <h2>Task Details</h2>
      <Link href="/board" className="hover:text-red-500">
        <X className="w-6 h-6 " />
      </Link>
    </div>

    <TaskField label="Title" value={task.title} />

    <TaskField
      label="Description"
      value={task.description}
      valueClassNames="min-h-40 whitespace-break-spaces"
    />

    <TaskField label="GitHub Repo" value={task.repoId} />

    <div className="columns-2">
      <TaskField label="Start Date" value={displayDate(task.startDate, D_M_Y)} />
      <TaskField label="End Date" value={displayDate(task.endDate, D_M_Y)} />
    </div>

    <div className="flex items-end justify-between mt-6 gap-x-2">
      <div className="space-y-1 text-xs text-muted-foreground">
        <div>
          <b>Created:</b> {displayDate(task.updatedAt, D_M_Y_TIME)} by {task.user.name}
        </div>
        <div>
          <b>Updated:</b> {displayDate(task.createdAt, D_M_Y_TIME)}
        </div>
      </div>

      <Badge variant={taskStatusToBadgeVariant[task.status]} className="min-h-14">
        {taskStatusToText[task.status]}
      </Badge>
    </div>

    <Separator orientation="horizontal" className="bg-neutral-400" />

    <Comments task={task} />
  </div>
);

TaskDetails.Skeleton = function TaskDetailsSkeleton() {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="space-y-1">
        <Skeleton className="w-24 h-4 bg-neutral-200" />
        <Skeleton className="h-8 w-30 bg-neutral-200" />
      </div>
      <Skeleton className="w-10 h-10 bg-neutral-200" />
    </div>
  );
};
