'use client';

import type { Dispatch, SetStateAction } from 'react';

import { Copy, Link, MoreVertical, Pen, Trash, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Task } from '@prisma/client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { toast } from '@ui/use-toast';
import { Spinner } from '@ui/spinner';

import { cn } from '@lib/utils';

import { deleteTask } from '@actions/delete-task';
import { copyTask } from '@actions/copy-task';

import { useAction } from '@hooks/use-action';

interface TaskActionsProps {
  task: Task;
  isEditing?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

export const TaskActions = ({ task, isEditing, setIsEditing }: TaskActionsProps) => {
  const session = useSession();
  const router = useRouter();

  // COPY ACTION
  const { execute: executeCopy, isLoading: isCopying } = useAction(copyTask, {
    onSuccess: () => {
      toast({
        title: `Task copied`,
      });
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onCopy = () => () => {
    executeCopy({
      id: task.id,
    });
  };

  // DELETE ACTION
  const { execute: executeDelete, isLoading: isDeleting } = useAction(deleteTask, {
    onSuccess: () => {
      toast({
        title: `Task deleted`,
      });
      router.push('/board');
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onDelete = () => () => {
    executeDelete({
      id: task.id,
    });
  };

  const userIsAuthor = task.userId === session?.data?.user.id;
  if (!session?.data?.user) {
    return null;
  }

  // UPDATE ACTION
  const onEdit = () => () => {
    setIsEditing && setIsEditing((prev) => !prev);
  };

  // SHARE ACTION
  const onCopyURL = () => () => {
    navigator.clipboard.writeText(`${window.location.origin}/board/task/${task.id}`);
    toast({
      title: 'The URL has been copied to the clipboard',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="h-5 w-5 cursor-pointer text-white hover:text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="text-sm font-medium">Task Actions</DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-neutral-400" />

        {userIsAuthor ? (
          <DropdownMenuItem
            onClick={onEdit()}
            className={cn(
              'flex cursor-pointer items-center gap-x-2',
              isEditing && 'focus:text-destructive',
            )}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" /> Stop Editing
              </>
            ) : (
              <>
                <Pen className="h-4 w-4" /> Edit
              </>
            )}
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem onClick={onCopy()} className="flex cursor-pointer items-center gap-x-2 ">
          {isCopying ? (
            <>
              <Spinner className="h-4 w-4 fill-primary" /> Copying...
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onCopyURL()}
          className="flex cursor-pointer items-center gap-x-2 "
        >
          <Link className="h-4 w-4" /> Share URL
        </DropdownMenuItem>

        {userIsAuthor ? (
          <DropdownMenuItem
            onClick={onDelete()}
            className="flex cursor-pointer items-center gap-x-2 focus:text-destructive"
          >
            {isDeleting ? (
              <>
                <Spinner className="h-4 w-4 fill-destructive" /> Deleting...
              </>
            ) : (
              <>
                <Trash className="h-4 w-4" /> Delete
              </>
            )}
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
