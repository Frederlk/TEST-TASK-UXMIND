import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const OPTIONAL_VALUE = 'N/A';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayValue(
  value: string | undefined | number | null,
  optionalValue = OPTIONAL_VALUE,
) {
  return value || optionalValue;
}

export function displayDate(
  date: Date | undefined | null,
  formatString: string,
  optionalValue = OPTIONAL_VALUE,
) {
  return date ? format(date, formatString) : optionalValue;
}

export function getFirstLastNameInitials(
  name: string | undefined | null,
  optionalValue = OPTIONAL_VALUE,
) {
  return name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('.')
    : optionalValue;
}
