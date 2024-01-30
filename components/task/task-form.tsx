'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, Info, LinkIcon, X } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { CreateTask } from '@/actions/create-task/schema';
import { createTask } from '@/actions/create-task';
import { useAction } from '@/hooks/use-action';
import { InputType as CreateTaskInputType } from '@/actions/create-task/types';
import { FullTask } from '@/types';
import { updateTask } from '@/actions/update-task';
import { D_M_Y } from '@/lib/date-formats';
import { useGitHubRepoDetails, useSearchGitHubRepos } from '@/hooks/use-github';
import { useRepoModal } from '@/hooks/use-repo-modal';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { RepoModal } from '../modals/repo-modal';

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
                    'md:min-h-40 disabled:cursor-default disabled:opacity-80',
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
              <div className="flex items-center gap-x-2 justify-between">
                <FormLabel>GitHub Repo</FormLabel>
                {field.value ? (
                  <div
                    role="button"
                    onClick={() => onOpen(field.value || 0)}
                    className="flex text-sm text-white items-center gap-x-2 hover:text-primary transition-colors"
                  >
                    <Info className="w-4 h-4" />
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
                        'w-full font-normal text-white justify-between',
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
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
          <div className="w-full flex gap-x-2 justify-end ">
            <Button
              onClick={onCancelClick()}
              variant="outline"
              className="w-auto md:w-auto"
              disabled={isSubmitting || isLoading}
            >
              {isEditing ? 'Cancel' : 'Reset'}
            </Button>
            <Button
              type="submit"
              className="w-auto md:w-auto"
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
