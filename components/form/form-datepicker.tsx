'use client';

import type { ReactNode } from 'react';

import type { Control, FieldValues, Path } from 'react-hook-form';

import { CalendarIcon } from 'lucide-react';

import { format } from 'date-fns';

import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';

import { cn } from '@lib/utils';
import { D_M_Y } from '@lib/date-formats';

interface FormDatepickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: ReactNode;
  isDisabled?: boolean;
  placeholder?: string;
  description?: ReactNode;
  classNames?: {
    item?: string;
    label?: string;
    input?: string;
    description?: string;
    message?: string;
  };
  disableDates?: (date: Date) => boolean;
  dateFormat?: string;
}

export const FormDatepicker = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  isDisabled,
  label,
  placeholder = 'Pick a date',
  disableDates,
  dateFormat = D_M_Y,
}: FormDatepickerProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(classNames?.item)}>
        {!!label && <FormLabel className={cn(classNames?.label)}>{label}</FormLabel>}

        <Popover>
          <PopoverTrigger disabled={isDisabled} asChild>
            <FormControl>
              <Button
                variant="input"
                className={cn(
                  'w-full pl-3 text-left font-normal text-white disabled:opacity-80',
                  classNames?.input,
                  !field.value && 'text-neutral-400',
                )}
              >
                {field.value ? format(field.value, dateFormat) : <span>{placeholder}</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              initialFocus
              selected={field.value}
              onSelect={field.onChange}
              disabled={disableDates}
            />
          </PopoverContent>
        </Popover>

        {!!description && <FormDescription className={cn(classNames?.description)} />}
        <FormMessage className={cn(classNames?.message)} />
      </FormItem>
    )}
  />
);
