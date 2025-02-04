import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { format, isSameDay, isToday } from 'date-fns';
import { cn } from "@/app/lib/utils";
import { TimeSlot } from "@/app/models/functions/timeslot.model";
import { useRef } from "react";

interface SelectDateTimeProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: TimeSlot | null;
  setSelectedTime: (time: TimeSlot | null) => void;
  availableDates: Date[];
  availableTimeSlots: TimeSlot[];
}

export function SelectDateTime({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availableDates,
  availableTimeSlots,
}: SelectDateTimeProps) {
  const timeSlotContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <Label className="text-gray-700">Select Date</Label>
        <div className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing rounded-md">
          <div className="flex space-x-2 w-max">
            {availableDates.map((date) => (
              <Button
                key={date.toISOString()}
                variant="outline"
                className={cn(
                  "flex-none px-4 py-6 flex flex-col items-center gap-1 select-none min-w-[100px] h-auto",
                  isSameDay(selectedDate, date) && "bg-black text-white hover:bg-gray-800",
                  isToday(date) && "border-black",
                )}
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-xs font-medium">
                  {format(date, 'EEE')}
                </span>
                <span className="text-lg">
                  {format(date, 'd')}
                </span>
                <span className="text-xs">
                  {format(date, 'MMM')}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Label className="text-gray-700">Select Start Time</Label>
        <div
          ref={timeSlotContainerRef}
          className="overflow-x-scroll scrollbar-hide rounded-md"
        >
          <div className="flex flex-col gap-2">
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((time) => (
                <Button
                  key={time.timeslot_id}
                  variant="outline"
                  className={cn(
                    "flex-none px-4 select-none",
                    selectedTime?.timeslot_id === time.timeslot_id && "bg-black text-white hover:bg-gray-800"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time.start_time.slice(0, -3)}
                </Button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500">
                No available time slots for this date
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 