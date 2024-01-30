import { type ElementRef, useRef, useState } from 'react';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { Check, Pen, Trash, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Textarea } from '@ui/textarea';
import { Button } from '@ui/button';
import { toast } from '@ui/use-toast';
import { Spinner } from '@ui/spinner';

import { cn, displayDate, getFirstLastNameInitials } from '@lib/utils';
import { D_M_Y_TIME } from '@lib/date-formats';

import { updateComment } from '@actions/update-comment';
import { UpdateCommentFormSchema } from '@actions/update-comment/schema';
import { InputType as UpdateCommentInputType } from '@actions/update-comment/types';
import { deleteComment } from '@actions/delete-comment';

import { useAction } from '@hooks/use-action';

import type { CommentWithUser } from '@types';

interface CommentItemProps {
  comment: CommentWithUser;
  taskUserId: string;
}

export const CommentItem = ({ comment, taskUserId }: CommentItemProps) => {
  const form = useForm<UpdateCommentInputType>({
    mode: 'onChange',
    resolver: zodResolver(UpdateCommentFormSchema),
    defaultValues: {
      message: comment.message,
    },
  });

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const session = useSession();
  const userIsAuthor = comment.user.id === session?.data?.user.id;
  const userIsCreator = taskUserId === session?.data?.user.id;

  const commentRef = useRef<ElementRef<'li'>>(null);

  // EDIT ACTION
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = (shouldReset?: boolean) => {
    shouldReset && reset();
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing(true);
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(commentRef, () => disableEditing(true));

  const queryClient = useQueryClient();

  const { execute: executeUpdate, isLoading: isUpdating } = useAction(updateComment, {
    onSuccess: () => {
      toast({
        title: `Comment edited`,
      });
      userIsCreator && queryClient.invalidateQueries({ queryKey: ['task'] });
      disableEditing();
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateCommentInputType> = (data) => {
    executeUpdate({
      message: data.message,
      id: comment.id,
      taskId: comment.taskId,
      userId: comment.user.id,
    });
  };

  // DELETE ACTION

  const { execute: executeDelete, isLoading: isDeleting } = useAction(deleteComment, {
    onSuccess: () => {
      toast({
        title: `Comment deleted`,
      });
      userIsCreator && queryClient.invalidateQueries({ queryKey: ['task'] });
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
      id: comment.id,
      taskId: comment.taskId,
      userId: comment.user.id,
    });
  };

  return (
    <li className="group flex w-full gap-x-2" ref={commentRef}>
      <Avatar className="h-8 w-8 rounded-md">
        <AvatarImage src={comment.user.image || undefined} />
        <AvatarFallback className="rounded-md bg-neutral-800 text-primary">
          {getFirstLastNameInitials(comment.user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="w-full space-y-1">
        <div className="-mt-1.5 flex h-6 items-center justify-between">
          <h5 className="text-sm leading-none text-white">
            <span className="font-semibold">{comment.user.name}</span>{' '}
            <span className="hidden lg:inline-flex">({comment.user.email})</span>
          </h5>

          {userIsAuthor && (
            <div className="flex items-center gap-x-3 lg:gap-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => form.handleSubmit(onSubmit)()}
                disabled={isUpdating || isSubmitting || !isValid}
                className={cn(
                  'invisible h-6 w-6 opacity-0 transition',
                  isEditing && 'visible opacity-100',
                  isValid && 'lg:hover:text-green-500',
                )}
              >
                {isUpdating || isSubmitting ? (
                  <Spinner className="h-4 w-4 fill-green-500" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing((prev) => !prev)}
                className={cn(
                  'h-6 w-6 transition lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100',
                  isEditing && 'hover:text-destructive lg:visible lg:opacity-100',
                )}
              >
                {isEditing ? <X className="h-5 w-5 " /> : <Pen className="h-4 w-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete()}
                className={cn(
                  'h-6 w-6 lg:invisible lg:opacity-0 lg:transition lg:group-hover:visible lg:group-hover:opacity-100 lg:hover:text-destructive',
                  isEditing && 'lg:visible lg:opacity-100',
                )}
              >
                {isDeleting ? (
                  <Spinner className="h-4 w-4 fill-destructive" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>
        {isEditing ? (
          <FormProvider {...form}>
            <form>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Textarea
                        placeholder="Your message"
                        className="min-h-20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
        ) : (
          <p className="whitespace-break-spaces text-sm text-neutral-400">{comment.message}</p>
        )}

        <div className="text-xs text-muted-foreground">
          {displayDate(comment.createdAt, D_M_Y_TIME)}
        </div>
      </div>
    </li>
  );
};
