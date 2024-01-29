'use client';

import { isBefore } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Task } from '@prisma/client';

import { cn, displayDate, displayValue } from '@/lib/utils';
import { D_M_Y } from '@/lib/date-formats';
import { TaskStatusBadge } from '@/components/task/task-status-badge';

export const BoardTaskItem = ({ task }: { task: Task }) => {
  const params = useParams();
  const taskId = params.taskId as string;

  const taskExpired = task.endDate ? !isBefore(new Date(), task.endDate) : false;

  return (
    <li>
      <Link
        href={`/board/task/${task.id}`}
        className={cn(
          'block w-full p-2 space-y-2 transition border  hover:border-white border-neutral-400',
          task.id === taskId && 'border-white',
        )}
      >
        <h4
          className={cn(
            'text-sm font-semibold line-clamp-1 text-white transition',
            task.id === taskId && 'text-primary',
          )}
        >
          {task.title}
        </h4>
        <p className="text-xs text-neutral-400 line-clamp-2">
          {displayValue(task.description, 'No description')}
        </p>
        <div className="flex items-center gap-x-2 justify-between">
          <div className={cn('text-xs text-muted-foreground', taskExpired && 'text-red-500')}>
            {!task.startDate && !task.endDate
              ? 'No due dates'
              : `${displayDate(task.startDate, D_M_Y)} - ${displayDate(task.endDate, D_M_Y)}`}
          </div>
          <TaskStatusBadge task={task} isEdit />
        </div>
      </Link>
    </li>
  );
};
