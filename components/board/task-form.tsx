'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
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
import { InputType } from '@/actions/create-task/types';

export const TaskForm = () => {
  const form = useForm<InputType>({
    mode: 'onChange',
    resolver: zodResolver(CreateTask),
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      endDate: undefined,
      repoId: '',
    },
  });

  const {
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const { execute, isLoading } = useAction(createTask, {
    onSuccess: (data) => {
      toast({
        title: `Card "${data.title}" created`,
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: error,
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    execute(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="flex items-center justify-between text-white gap-x-8">
          <h2>Create New Task</h2>
          <Link href="/board" className="hover:text-red-500">
            <X className="w-6 h-6 " />
          </Link>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
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
                <Textarea placeholder="Enter a description" className="min-h-40" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo</FormLabel>
              <FormControl>
                <Input placeholder="Select a GitHub repo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="columns-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="input"
                        className={cn(
                          'w-full pl-3 text-left font-normal text-white',
                          !field.value && 'text-neutral-400',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd-LL-yyyy')
                        ) : (
                          <span>Pick a start date</span>
                        )}
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
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="input"
                        className={cn(
                          'w-full pl-3 text-left font-normal text-white',
                          !field.value && 'text-neutral-400',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd-LL-yyyy')
                        ) : (
                          <span>Pick an end date</span>
                        )}
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
        <Button
          type="submit"
          className="float-right"
          disabled={!(isDirty && isValid) || isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Submitting...' : 'Create task'}
        </Button>
      </form>
    </FormProvider>
  );
};
