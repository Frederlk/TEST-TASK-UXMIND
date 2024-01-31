'use client';

import type { ReactNode } from 'react';

import type { Control, FieldValues, Path } from 'react-hook-form';

import { Textarea } from '@ui/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';

import { cn } from '@lib/utils';

interface FormTextareaProps<T extends FieldValues> {
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
}

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  isDisabled,
  label,
  placeholder,
}: FormTextareaProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(classNames?.item)}>
        {!!label && <FormLabel className={cn(classNames?.label)}>{label}</FormLabel>}
        <FormControl>
          <Textarea
            disabled={isDisabled}
            placeholder={placeholder}
            className={cn(classNames?.input)}
            {...field}
          />
        </FormControl>
        {!!description && <FormDescription className={cn(classNames?.description)} />}
        <FormMessage className={cn(classNames?.message)} />
      </FormItem>
    )}
  />
);
