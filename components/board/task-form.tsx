'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CreateTaskSchema } from '@/actions/create-task/schema';
import { createTask } from '@/actions/create-task';
import { useAction } from '@/hooks/use-action';
import { InputType } from '@/actions/create-task/types';
import { UserType } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

export const TaskForm = ({ user }: { user: UserType }) => {
  const form = useForm<InputType>({
    mode: 'onChange',
    resolver: zodResolver(CreateTaskSchema),
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

  const { execute } = useAction(createTask, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full h-full gap-y-4">
        <div className="space-y-4 grow">
          <div className="flex items-center justify-between text-white gap-x-2">
            <h2>Create New Task</h2>
            <Button asChild size="icon" variant="ghost" className="hover:text-red-500">
              <X className="w-6 h-6 " />
            </Button>
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
                <FormLabel>Task Details</FormLabel>
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
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
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
                        disabled={(date: Date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={!(isDirty && isValid) || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create'}
        </Button>
      </form>
    </FormProvider>
  );
};
