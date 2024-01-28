'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';

import { FullTask } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Comments } from '@/components/comments';
import { D_M_Y_TIME } from '@/constants/date-formats';
import { displayDate } from '@/lib/utils';

import { TaskForm } from './task-form';
import { TaskActions } from './task-actions';
import { TaskStatusBadge } from './task-status-badge';

export const TaskDetails = ({ task }: { task: FullTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  useEventListener('keydown', onKeyDown);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-x-4">
        <div className="flex items-center gap-x-1">
          <h2 className="text-white">{isEditing && 'Editing '} Task Details</h2>
          <TaskActions task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>

        <Link href="/board" className="text-white hover:text-red-500">
          <X className="w-6 h-6" />
        </Link>
      </div>

      <TaskForm isEditing={isEditing} setIsEditing={setIsEditing} task={task} />

      <Separator orientation="horizontal" className="bg-neutral-400" />

      <div className="flex items-center justify-between gap-x-2">
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            <b>Updated:</b> {displayDate(task.updatedAt, D_M_Y_TIME)}
          </div>
          <div>
            <b>Created:</b> {displayDate(task.createdAt, D_M_Y_TIME)} by {task.user.name}
          </div>
        </div>

        <TaskStatusBadge task={task} isEdit />
      </div>

      <Separator orientation="horizontal" className="bg-neutral-400" />

      <Comments task={task} />
    </div>
  );
};
