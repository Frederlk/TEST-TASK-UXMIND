import { TaskStatus } from '@prisma/client';

import { taskStatusToText } from './task-status';

export enum SearchByFilters {
  TITLE = 'TITLE',
  DESCRIPTION = 'DESCRIPTION',
}

export const DEFAULT_SEARCH_BY_FILTERS = [SearchByFilters.TITLE, SearchByFilters.DESCRIPTION];

export const searchByFiltersToText: {
  [key in SearchByFilters]: string;
} = {
  [SearchByFilters.TITLE]: 'Title',
  [SearchByFilters.DESCRIPTION]: 'Description',
};

export const DEFAULT_FILTER_BY_STATUS = [
  TaskStatus.TO_DO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.ON_HOLD,
  TaskStatus.DONE,
];

export const SEARCH_BY_ITEMS = (Object.keys(SearchByFilters) as SearchByFilters[]).map((key) => ({
  id: key,
  label: searchByFiltersToText[key],
}));

export const STATUS_ITEMS = (Object.keys(TaskStatus) as TaskStatus[]).map((key) => ({
  id: key,
  label: taskStatusToText[key],
}));
