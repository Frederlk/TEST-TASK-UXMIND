'use client';

import { Copy, MoreVertical, Pen, Trash, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteTask } from '@/actions/delete-task';
import { useAction } from '@/hooks/use-action';
import { FullTask } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/ui/spinner';
import { copyTask } from '@/actions/copy-task';
import { cn } from '@/lib/utils';

interface TaskDetailsActions {
  task: FullTask;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const TaskDetailsActions = ({ task, isEditing, setIsEditing }: TaskDetailsActions) => {
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
  const onEdit = () => () => setIsEditing((prev) => !prev);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="w-5 h-5 text-white cursor-pointer hover:text-primary" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="text-sm font-medium">Task Actions</DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-neutral-400" />

        {userIsAuthor ? (
          <DropdownMenuItem
            onClick={onEdit()}
            className={cn(
              'cursor-pointer flex items-center gap-x-2',
              isEditing && 'focus:text-red-500',
            )}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" /> Stop Editing
              </>
            ) : (
              <>
                <Pen className="w-4 h-4" /> Edit
              </>
            )}
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem onClick={onCopy()} className="cursor-pointer flex items-center gap-x-2 ">
          {isCopying ? (
            <>
              <Spinner className="w-4 h-4 fill-primary" /> Copying...
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy
            </>
          )}
        </DropdownMenuItem>

        {userIsAuthor ? (
          <DropdownMenuItem
            onClick={onDelete()}
            className="cursor-pointer flex items-center gap-x-2 focus:text-red-500"
          >
            {isDeleting ? (
              <>
                <Spinner className="w-4 h-4 fill-red-500" /> Deleting...
              </>
            ) : (
              <>
                <Trash className="w-4 h-4" /> Delete
              </>
            )}
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
