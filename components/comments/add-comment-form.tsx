'use client';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { toast } from '@ui/use-toast';
import { FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Button } from '@ui/button';
import { Textarea } from '@ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';

import { getFirstLastNameInitials } from '@lib/utils';

import { createComment } from '@actions/create-comment';
import { InputType as AddCommentInputType } from '@actions/create-comment/types';
import { CreateCommentFormSchema } from '@actions/create-comment/schema';

import { useAction } from '@hooks/use-action';

export const AddCommentForm = ({ taskId }: { taskId: string }) => {
  const session = useSession();

  const form = useForm<AddCommentInputType>({
    mode: 'onChange',
    resolver: zodResolver(CreateCommentFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const {
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
      queryClient.invalidateQueries({ queryKey: ['task'] });
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
      taskId,
    });
  };

  if (!session.data?.user) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex w-full gap-x-2">
          <Avatar className="hidden h-8 w-8 rounded-md lg:block">
            <AvatarImage src={session?.data?.user.image || undefined} />
            <AvatarFallback className="rounded-md bg-neutral-800 text-primary">
              {getFirstLastNameInitials(session?.data?.user.name)}
            </AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="relative grow">
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="min-h-20 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
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
