'use client';

import { type Dispatch, type SetStateAction, useState } from 'react';

import type { FullTask } from '@types';

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, Info, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'usehooks-ts';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Textarea } from '@ui/textarea';
import { toast } from '@ui/use-toast';
import { Calendar } from '@ui/calendar';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@ui/command';

import { cn } from '@lib/utils';
import { D_M_Y } from '@lib/date-formats';

import { CreateTask } from '@actions/create-task/schema';
import { createTask } from '@actions/create-task';
import { InputType as CreateTaskInputType } from '@actions/create-task/types';
import { updateTask } from '@actions/update-task';

import { useAction } from '@hooks/use-action';
import { useSearchGitHubRepos } from '@hooks/use-github';
import { useRepoModal } from '@hooks/use-repo-modal';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input
                  disabled={formIsDisabled}
                  placeholder="Enter a title"
                  className="disabled:cursor-default disabled:opacity-80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={formIsDisabled}
                  placeholder="Enter a description"
                  className={cn(
                    'disabled:cursor-default disabled:opacity-80 lg:min-h-40',
                    field.value ? 'min-h-[70dvh]' : 'min-h-[30dvh]',
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repoId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center justify-between gap-x-2">
                <FormLabel>GitHub Repo</FormLabel>
                {field.value ? (
                  <div
                    role="button"
                    onClick={() => onOpen(field.value || 0)}
                    className="flex items-center gap-x-2 text-sm text-white transition-colors hover:text-primary"
                  >
                    <Info className="h-4 w-4" />
                    Check repo details
                  </div>
                ) : null}
              </div>
              <Popover>
                <PopoverTrigger disabled={formIsDisabled} asChild>
                  <FormControl>
                    <Button
                      variant="input"
                      role="combobox"
                      className={cn(
                        'w-full justify-between font-normal text-white',
                        !field.value && 'text-neutral-400',
                      )}
                    >
                      {form.getValues('repoName') || 'Add a GitHub repo'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56 p-0">
                  <Command>
                    <CommandInput onValueChange={(e) => setRepoQuery(e)} placeholder="Search..." />
                    <CommandEmpty>
                      {isReposLoading ? 'Loading...' : 'No repositories found'}{' '}
                    </CommandEmpty>
                    <CommandGroup>
                      {repos?.map((repo: any) => (
                        <CommandItem
                          value={repo.label}
                          key={repo.value}
                          onSelect={() => {
                            form.setValue('repoId', repo.value);
                            form.setValue('repoName', repo.label);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4 shrink-0',
                              repo.value === field.value ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {repo.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="columns-2 gap-x-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger disabled={formIsDisabled} asChild>
                    <FormControl>
                      <Button
                        variant="input"
                        className={cn(
                          'w-full pl-3 text-left font-normal text-white disabled:opacity-80',
                          !field.value && 'text-neutral-400',
                        )}
                      >
                        {field.value ? format(field.value, D_M_Y) : <span>Pick a start date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date: Date) => {
                        const endDate = form.getValues('endDate');

                        if (endDate) {
                          return endDate < date;
                        } else {
                          return false;
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger disabled={formIsDisabled} asChild>
                    <FormControl>
                      <Button
                        variant="input"
                        className={cn(
                          'w-full pl-3 text-left font-normal text-white disabled:opacity-80',
                          !field.value && 'text-neutral-400',
                        )}
                      >
                        {field.value ? format(field.value, D_M_Y) : <span>Pick an end date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date: Date) => {
                        const startDate = form.getValues('startDate');

                        if (startDate) {
                          return startDate > date;
                        } else {
                          return false;
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!formIsDisabled ? (
          <div className="flex w-full justify-end gap-x-2 ">
            <Button
              onClick={onCancelClick()}
              variant="outline"
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
        ) : null}
      </form>
    </FormProvider>
  );
};
