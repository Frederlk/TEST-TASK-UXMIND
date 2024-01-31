'use client';

import type { ReactNode } from 'react';

import { useFormContext, type Control, type FieldValues, type Path } from 'react-hook-form';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Button } from '@ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';

import { cn } from '@lib/utils';

import type { OptionsItem } from '@types';

interface FormCombboxProps<T extends FieldValues> {
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
  labelFieldName?: Path<T>;
  commandEmpty?: string;
  onValueChange?: (search: string) => void;
  extraLabel?: ReactNode;
  items: OptionsItem[];
}

export const FormCombobox = <T extends FieldValues>({
  control,
  name,
  classNames,
  description,
  isDisabled,
  label,
  extraLabel,
  placeholder,
  onValueChange,
  labelFieldName,
  commandEmpty = 'Nothing found',
  items,
}: FormCombboxProps<T>) => {
  const { setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', classNames?.item)}>
          <div className="flex items-center justify-between gap-x-2">
            {!!label && <FormLabel className={cn(classNames?.label)}>{label}</FormLabel>}
            {!!extraLabel && extraLabel}
          </div>

          <FormControl>
            <Popover>
              <PopoverTrigger disabled={isDisabled} asChild>
                <FormControl>
                  <Button
                    variant="input"
                    role="combobox"
                    aria-label="Open search"
                    className={cn(
                      'w-full justify-between font-normal text-white disabled:cursor-default disabled:opacity-80',
                      classNames?.input,
                      !field.value && 'text-neutral-400',
                    )}
                  >
                    {placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-0">
                <Command>
                  <CommandInput onValueChange={onValueChange} placeholder="Search..." />
                  <CommandEmpty>{commandEmpty}</CommandEmpty>
                  <CommandGroup>
                    {items?.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.value}
                        onSelect={() => {
                          setValue(name, item.value, {
                            shouldValidate: true,
                          });
                          !!labelFieldName &&
                            setValue(labelFieldName, item.label, {
                              shouldValidate: true,
                            });
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            item.value === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>

          {!!description && <FormDescription className={cn(classNames?.description)} />}
          <FormMessage className={cn(classNames?.message)} />
        </FormItem>
      )}
    />
  );
};
