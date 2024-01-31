'use client';

import { useEffect, useState } from 'react';

import { SlidersHorizontal } from 'lucide-react';
import { useDebounce } from 'usehooks-ts';
import Link from 'next/link';

import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { Separator } from '@ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { Label } from '@ui/label';
import { Checkbox } from '@ui/checkbox';

import { SEARCH_BY_ITEMS, STATUS_ITEMS } from '@lib/filters';

import { useFilters } from '@hooks/use-filters';

export const BoardFilters = () => {
  const { filters, setField, setQuery, setStatus } = useFilters();

  const [text, setText] = useState<string>(filters.query);

  const debouncedQuery = useDebounce(text, 500);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery, setQuery]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <div className="flex items-center gap-x-2">
          <Input
            name="search"
            placeholder="Search tasks..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />

          <AccordionTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-6 w-6 transition" />
            </Button>
          </AccordionTrigger>

          <Button asChild>
            <Link href="/board/form">New Task</Link>
          </Button>
        </div>

        <AccordionContent className="flex gap-4 pb-0 pt-2">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Search by fields...</Label>
            {SEARCH_BY_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  onClick={() => setField(item.id)}
                  checked={filters.fields.includes(item.id)}
                />
                <Label htmlFor={item.id} className="cursor-pointer text-sm text-white">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <Label className="text-muted-foreground">Filter by status...</Label>
            {STATUS_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  onClick={() => setStatus(item.id)}
                  checked={filters.statuses.includes(item.id)}
                />
                <Label htmlFor={item.id} className="cursor-pointer text-sm text-white">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>

        <Separator orientation="horizontal" className="mt-4 bg-neutral-400" />
      </AccordionItem>
    </Accordion>
  );
};
