import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { OPTIONAL_VALUE } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayValue(value: string | undefined | number | null) {
  return value || OPTIONAL_VALUE;
}

export function displayDate(date: Date | undefined | null, formatString: string) {
  return date ? format(date, formatString) : OPTIONAL_VALUE;
}

export function getFirstLastNameInitials(name?: string | null) {
  return name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('.')
    : OPTIONAL_VALUE;
}
