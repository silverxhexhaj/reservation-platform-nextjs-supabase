'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths } from 'date-fns';

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function CalendarHeader({ selectedDate, onDateChange }: CalendarHeaderProps) {
  function handlePreviousMonth() {
    onDateChange(subMonths(selectedDate, 1));
  }

  function handleNextMonth() {
    onDateChange(addMonths(selectedDate, 1));
  }

  function handleTodayClick() {
    onDateChange(new Date());
  }

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-semibold">
        {format(selectedDate, 'MMMM yyyy')}
      </h1>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleTodayClick}
        >
          Today
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 