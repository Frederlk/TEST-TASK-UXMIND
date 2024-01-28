'use client';

import { Task } from '@prisma/client';
import { isBefore } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { taskStatusToBadgeVariant, taskStatusToText } from '@/lib/display-task-status';
import { Badge } from '@/components/ui/badge';
import { cn, displayDate } from '@/lib/utils';
import { D_M_Y } from '@/constants/date-formats';

export const TaskItem = ({ task }: { task: Task }) => {
  const params = useParams();
  const taskId = params.taskId as string;

  const taskExpired = task.endDate ? !isBefore(new Date(), task.endDate) : false;

  return (
    <li>
      <Link
        href={`/board/task/${task.id}`}
        className={cn(
          'flex justify-between transition border-2 group cursor-pointer hover:border-white border-neutral-400',
          task.id === taskId && 'border-white',
        )}
      >
        <div className="w-full p-2 pr-8 overflow-hidden">
          <h4
            className={cn(
              'mb-1 text-sm font-semibold text-white truncate transition',
              task.id === taskId && 'text-primary',
            )}
          >
            {task.title}
          </h4>
          <div className={cn('text-xs text-neutral-400', taskExpired && 'text-red-500')}>
            <b>Date:</b> {displayDate(task.startDate, D_M_Y)} - {displayDate(task.endDate, D_M_Y)}
          </div>
        </div>
        <Badge
          variant={taskStatusToBadgeVariant[task.status]}
          className="justify-center text-xs md:h-container min-w-24 md:text-sm md:min-w-28"
        >
          In Progress
          {/* {taskStatusToText[task.status]} */}
        </Badge>
      </Link>
    </li>
  );
};
