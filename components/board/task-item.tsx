'use client';

import { Task } from '@prisma/client';
import { format } from 'date-fns';

import { taskStatusToBadgeVariant, taskStatusToText } from '@/lib/display-task-status';
import { Badge } from '@/components/ui/badge';

export const TaskItem = ({ task }: { task: Task }) => (
  <li role="button" onClick={() => {}}>
    <div className="flex justify-between group cursor-pointer">
      <div className="border group-hover:border-primary transition-colors border-neutral-400 border-r-0 w-full p-2 overflow-hidden pr-8">
        <h4 className="mb-1 font-semibold text-white truncate text-sm">{task.title}</h4>
        <div className="text-xs text-neutral-400">
          <span className="font-semibold">Date:</span>{' '}
          {task.startDate ? format(task.startDate, 'dd-LL-yyyy') : 'N/A'} -{' '}
          {task.endDate ? format(task.endDate, 'dd-LL-yyyy') : 'N/A'}
        </div>
      </div>
      <Badge
        variant={taskStatusToBadgeVariant[task.status]}
        className="h-container min-w-[100px] text-sm justify-center"
      >
        {taskStatusToText[task.status]}
      </Badge>
    </div>
  </li>
);
