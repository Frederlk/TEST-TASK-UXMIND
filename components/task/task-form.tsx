'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'usehooks-ts';

import { FormInput } from '@components/form/form-input';
import { FormTextarea } from '@components/form/form-textarea';
import { FormDatepicker } from '@components/form/form-datepicker';
import { FormCombobox } from '@components/form/form-combobox';

import { Button } from '@ui/button';
import { toast } from '@ui/use-toast';

import { CreateTask } from '@actions/create-task/schema';
import { createTask } from '@actions/create-task';
import { InputType as CreateTaskInputType } from '@actions/create-task/types';
import { updateTask } from '@actions/update-task';

import { useAction } from '@hooks/use-action';
import { useSearchGitHubRepos } from '@hooks/use-github';
import { useRepoModal } from '@hooks/use-repo-modal';

import type { FullTask } from '@types';

interface TaskFormActions {
  task?: FullTask;
  isEditing?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}

export const TaskForm = ({ task, isEditing, setIsEditing }: TaskFormActions) => {
  const formIsDisabled = task && !isEditing;

  const form = useForm<CreateTaskInputType>({
    mode: 'onChange',
    resolver: zodResolver(CreateTask),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      startDate: task?.startDate ? new Date(task?.startDate) : undefined,
      endDate: task?.endDate ? new Date(task?.endDate) : undefined,
      repoId: task?.repoId || undefined,
      repoName: task?.repoName || '',
    },
  });

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const [repoQuery, setRepoQuery] = useState('');
  const debouncedQuery = useDebounce(repoQuery, 500) || '';
  const { isReposLoading, repos } = useSearchGitHubRepos(debouncedQuery);
  const { onOpen } = useRepoModal();

  const queryClient = useQueryClient();

  // CREATE ACTION
  const { execute: executeCreate, isLoading: isCreating } = useAction(createTask, {
    onSuccess: () => {
      toast({
        title: 'Task Created',
      });
      queryClient.invalidateQueries({ queryKey: ['task'] });
      reset();
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  // UPDATE ACTION
  const { execute: executeUpdate, isLoading: isUpdating } = useAction(updateTask, {
    onSuccess: () => {
      toast({
        title: 'Task Updated',
      });
      queryClient.invalidateQueries({ queryKey: ['task'] });
      setIsEditing && setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<CreateTaskInputType> = async (data) => {
    task
      ? executeUpdate({
          id: task.id,
          ...data,
        })
      : executeCreate(data);
  };

  const onCancelClick = () => () => {
    reset();
    setIsEditing && setIsEditing(false);
  };

  const isLoading = isUpdating || isCreating;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <FormInput
          control={control}
          name="title"
          label="Task Title"
          placeholder="Enter a title"
          isDisabled={formIsDisabled}
        />

        <FormTextarea
          control={control}
          name="description"
          label="Task Description"
          placeholder="Enter a description"
          isDisabled={formIsDisabled}
          classNames={{
            input: 'min-h-[40dvh] lg:min-h-40',
          }}
        />

        <FormCombobox
          control={control}
          name="repoId"
          labelFieldName="repoName"
          label="GitHub Repo"
          isDisabled={formIsDisabled}
          items={repos}
          onValueChange={setRepoQuery}
          placeholder={getValues('repoName') || 'Add a GitHub repo'}
          commandEmpty={isReposLoading ? 'Loading...' : 'No repositories found'}
          extraLabel={
            !!getValues('repoId') && (
              <div
                role="button"
                onClick={() => onOpen(getValues('repoId')!)}
                className="flex items-center gap-x-2 text-sm text-white transition-colors hover:text-primary"
              >
                <Info className="h-4 w-4" />
                Check repo details
              </div>
            )
          }
        />

        <div className="columns-2 gap-x-2">
          <FormDatepicker
            control={control}
            name="startDate"
            isDisabled={formIsDisabled}
            label="Start Date"
            placeholder="Pick a start date"
            disableDates={(date) => {
              const endDate = getValues('endDate');
              return endDate ? endDate < date : false;
            }}
          />
          <FormDatepicker
            control={control}
            name="endDate"
            isDisabled={formIsDisabled}
            label="End Date"
            placeholder="Pick an end date"
            disableDates={(date) => {
              const startDate = getValues('startDate');
              return startDate ? startDate > date : false;
            }}
          />
        </div>

        {!formIsDisabled && (
          <div className="flex w-full justify-end gap-x-2 ">
            <Button
              onClick={onCancelClick()}
              variant="outline"
              type="button"
              className="w-auto lg:w-auto"
              disabled={isSubmitting || isLoading}
            >
              {isEditing ? 'Cancel' : 'Reset'}
            </Button>
            <Button
              type="submit"
              className="w-auto lg:w-auto"
              disabled={!isValid || isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
