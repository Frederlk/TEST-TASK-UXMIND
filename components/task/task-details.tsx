'use client';

import { useState } from 'react';

import { X } from 'lucide-react';
import { useEventListener } from 'usehooks-ts';
import Link from 'next/link';

import { Comments } from '@components/task/comments';

import { Separator } from '@ui/separator';

import { D_M_Y_TIME } from '@lib/date-formats';
import { displayDate } from '@lib/utils';

import type { FullTask } from '@types';

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
        <div className="flex items-center gap-x-1 ">
          <h2 className="text-white">Task Details</h2>
          <TaskActions task={task} isEditing={isEditing} setIsEditing={setIsEditing} />
          {isEditing && <span className="text-primary">Editing</span>}
        </div>

        <Link
          href="/board"
          className="text-white transition hover:text-destructive"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
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
