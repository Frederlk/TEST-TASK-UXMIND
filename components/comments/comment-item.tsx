import { ElementRef, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { Check, Pen, Trash, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { cn, displayDate, getFirstLastNameInitials } from '@/lib/utils';
import { D_M_Y_TIME } from '@/constants/date-formats';
import { CommentWithUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAction } from '@/hooks/use-action';
import { updateComment } from '@/actions/update-comment';
import { UpdateCommentFormSchema } from '@/actions/update-comment/schema';
import { InputType as UpdateCommentInputType } from '@/actions/update-comment/types';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { deleteComment } from '@/actions/delete-comment';
import { Spinner } from '@/components/ui/spinner';

export const CommentItem = ({ comment }: { comment: CommentWithUser }) => {
  // EDIT ACTION
  const session = useSession();
  const userIsAuthor = comment.user.id === session?.data?.user.id;

  const commentRef = useRef<ElementRef<'li'>>(null);

  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(commentRef, disableEditing);

  const form = useForm<UpdateCommentInputType>({
    mode: 'onChange',
    resolver: zodResolver(UpdateCommentFormSchema),
    defaultValues: {
      message: comment.message,
    },
  });

  const {
    formState: { isSubmitting, isValid },
  } = form;

  const queryClient = useQueryClient();

  const { execute: executeUpdate, isLoading: isUpdating } = useAction(updateComment, {
    onSuccess: () => {
      toast({
        title: `Comment edited`,
      });
      queryClient.invalidateQueries({ queryKey: ['task'] });
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
      queryClient.invalidateQueries({ queryKey: ['task'] });
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
    <li className="flex w-full gap-x-2 group" ref={commentRef}>
      <Avatar className="w-8 h-8 rounded-md">
        <AvatarImage src={comment.user.image || undefined} />
        <AvatarFallback className="rounded-md bg-neutral-800 text-primary">
          {getFirstLastNameInitials(comment.user.name)}
        </AvatarFallback>
      </Avatar>

      <div className="w-full space-y-1">
        <div className="flex items-center justify-between h-6 -mt-1.5">
          <h5 className="text-sm leading-none text-white">
            <span className="font-semibold">{comment.user.name}</span>{' '}
            <span className="hidden md:inline-flex">({comment.user.email})</span>
          </h5>

          {userIsAuthor ? (
            <div className="flex items-center gap-x-3 md:gap-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => form.handleSubmit(onSubmit)()}
                disabled={isUpdating || isSubmitting || !isValid}
                className={cn(
                  'invisible w-6 h-6 transition opacity-0',
                  isEditing && 'opacity-100 visible',
                  isValid && 'md:hover:text-green-500',
                )}
              >
                {isUpdating || isSubmitting ? (
                  <Spinner className="w-4 h-4 fill-green-500" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing((prev) => !prev)}
                className={cn(
                  'md:invisible w-6 h-6 transition md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible',
                  isEditing && 'md:opacity-100 md:visible hover:text-red-500',
                )}
              >
                {isEditing ? <X className="w-5 h-5 " /> : <Pen className="w-4 h-4" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete()}
                className={cn(
                  'w-6 h-6 md:invisible md:transition md:opacity-0 md:group-hover:opacity-100 md:group-hover:visible md:hover:text-red-500',
                  isEditing && 'md:opacity-100 md:visible',
                )}
              >
                {isDeleting ? (
                  <Spinner className="w-4 h-4 fill-red-500" />
                ) : (
                  <Trash className="w-4 h-4" />
                )}
              </Button>
            </div>
          ) : null}
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
                        className="resize-none min-h-20"
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
          <p className="text-sm text-neutral-400 whitespace-break-spaces">{comment.message}</p>
        )}

        <div className="text-xs text-muted-foreground">
          {displayDate(comment.createdAt, D_M_Y_TIME)}
        </div>
      </div>
    </li>
  );
};
