'use client';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { FormTextarea } from '@components/form/form-textarea';

import { toast } from '@ui/use-toast';
import { Button } from '@ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';

import { getFirstLastNameInitials } from '@lib/utils';

import { createComment } from '@actions/create-comment';
import { InputType as AddCommentInputType } from '@actions/create-comment/types';
import { CreateCommentFormSchema } from '@actions/create-comment/schema';

import { useAction } from '@hooks/use-action';

import { FullTask } from '@types';

export const AddCommentForm = ({ task }: { task: FullTask }) => {
  const session = useSession();
  const userIsCreator = task.userId === session?.data?.user.id;

  const form = useForm<AddCommentInputType>({
    mode: 'onChange',
    resolver: zodResolver(CreateCommentFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const queryClient = useQueryClient();

  const { execute, isLoading } = useAction(createComment, {
    onSuccess: () => {
      toast({
        title: `Comment added`,
      });
      reset();
      userIsCreator && queryClient.invalidateQueries({ queryKey: ['task'] });
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<AddCommentInputType> = (data) => {
    execute({
      message: data.message,
      taskId: task.id,
    });
  };

  if (!session.data?.user) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex w-full gap-x-2">
          <Avatar className="hidden h-8 w-8 rounded-md lg:block">
            <AvatarImage
              src={session?.data?.user.image || undefined}
              alt={session?.data?.user.name || 'Avatar'}
            />
            <AvatarFallback className="rounded-md bg-neutral-800 text-primary">
              {getFirstLastNameInitials(session?.data?.user.name)}
            </AvatarFallback>
          </Avatar>
          <FormTextarea
            control={control}
            name="message"
            placeholder="Your message"
            classNames={{
              item: 'relative grow',
              input: 'min-h-20 resize-none',
              message: 'absolute',
            }}
          />
        </div>
        <Button
          type="submit"
          className="w-full lg:float-right lg:w-auto"
          disabled={!(isDirty && isValid) || isLoading || isSubmitting}
        >
          {isSubmitting || isLoading ? 'Submitting...' : 'Add comment'}
        </Button>
      </form>
    </FormProvider>
  );
};
