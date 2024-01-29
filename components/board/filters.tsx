'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useDebounce } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useFilters } from '@/hooks/use-filters';
import { SEARCH_BY_ITEMS, STATUS_ITEMS } from '@/lib/filters';

export const BoardFilters = () => {
  const { filters, setField, setQuery, setStatus } = useFilters();

  const [text, setText] = useState<string>(filters.query);

  const debouncedQuery = useDebounce(text, 500);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

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
              <SlidersHorizontal className="w-6 h-6 transition" />
            </Button>
          </AccordionTrigger>

          <Button asChild>
            <Link href="/board/form">New Task</Link>
          </Button>
        </div>

        <AccordionContent className="flex gap-4 pt-2 pb-0">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Search by fields...</Label>
            {SEARCH_BY_ITEMS.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  onClick={() => setField(item.id)}
                  checked={filters.fields.includes(item.id)}
                />
                <Label htmlFor={item.id} className="text-sm text-white cursor-pointer">
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
                <Label htmlFor={item.id} className="text-sm text-white cursor-pointer">
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
