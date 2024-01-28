'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'Zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const filtersSchema = z.object({
  search: z.string(),
  status: z.string(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

export const Filters = () => {
  const form = useForm<FiltersSchema>({
    mode: 'onChange',
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      search: '',
      status: '',
    },
  });

  const onSubmit: SubmitHandler<FiltersSchema> = async (data) => {};

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-x-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Search tasks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>
            <SlidersHorizontal className="w-6 h-6" />
          </Button>

          <Button variant="outline" asChild>
            <Link href="/board/form">New Task</Link>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
