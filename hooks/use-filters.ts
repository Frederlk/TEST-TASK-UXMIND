import { create, StateCreator } from 'zustand';
import { persist, type PersistOptions, createJSONStorage } from 'zustand/middleware';

import { DEFAULT_FILTER_BY_STATUS, DEFAULT_SEARCH_BY_FILTERS } from '@lib/filters';

export type Filters = {
  query: string;
  fields: string[];
  statuses: string[];
};

type FiltersStore = {
  filters: Filters;
  setQuery: (value: string) => void;
  setField: (field: string) => void;
  setStatus: (status: string) => void;
};

type MyPersist = (
  config: StateCreator<FiltersStore>,
  options: PersistOptions<FiltersStore>,
) => StateCreator<FiltersStore>;

export const useFilters = create<FiltersStore, []>(
  (persist as MyPersist)(
    (set) => ({
      filters: {
        query: '',
        fields: DEFAULT_SEARCH_BY_FILTERS,
        statuses: DEFAULT_FILTER_BY_STATUS,
      },
      setField: (field) =>
        set(({ filters }) => ({
          filters: {
            ...filters,
            fields:
              filters.fields.indexOf(field) !== -1
                ? filters.fields.filter((f) => f !== field)
                : [...filters.fields, field],
          },
        })),
      setStatus: (status) =>
        set(({ filters }) => ({
          filters: {
            ...filters,
            statuses:
              filters.statuses.indexOf(status) !== -1
                ? filters.statuses.filter((s) => s !== status)
                : [...filters.statuses, status],
          },
        })),
      setQuery: (query) =>
        set(({ filters }) => ({
          filters: {
            ...filters,
            query,
          },
        })),
    }),
    {
      name: 'filters-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
