import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  addMinutes,
  isBefore,
  isAfter,
  isSameDay,
  setMinutes,
  format
} from 'date-fns';
import type { CalendarEvent, TimeSlot, BusinessHours } from '@/app/types/calendar';

export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
}

export function generateTimeSlots(
  date: Date,
  businessHours: BusinessHours,
  existingEvents: CalendarEvent[],
  interval: number = 30
): TimeSlot[] {
  const dayOfWeek = format(date, 'EEEE').toLowerCase();
  const hours = businessHours[dayOfWeek];

  if (!hours || !hours.isOpen) {
    return [];
  }

  const [startHour, startMinute] = hours.start.split(':').map(Number);
  const [endHour, endMinute] = hours.end.split(':').map(Number);

  const startTime = setMinutes(startOfDay(date), startHour * 60 + startMinute);
  const endTime = setMinutes(startOfDay(date), endHour * 60 + endMinute);

  const slots: TimeSlot[] = [];
  let currentTime = startTime;

  while (isBefore(currentTime, endTime)) {
    const slotEnd = addMinutes(currentTime, interval);
    const overlappingEvents = existingEvents.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        isSameDay(currentTime, eventStart) &&
        ((isBefore(currentTime, eventEnd) && isAfter(slotEnd, eventStart)) ||
          (isBefore(eventStart, slotEnd) && isAfter(eventEnd, currentTime)))
      );
    });

    slots.push({
      time: new Date(currentTime),
      isAvailable: overlappingEvents.length === 0,
      events: overlappingEvents
    });

    currentTime = slotEnd;
  }

  return slots;
}

export function getDefaultBusinessHours(): BusinessHours {
  return {
    monday: { isOpen: true, start: '09:00', end: '17:00' },
    tuesday: { isOpen: true, start: '09:00', end: '17:00' },
    wednesday: { isOpen: true, start: '09:00', end: '17:00' },
    thursday: { isOpen: true, start: '09:00', end: '17:00' },
    friday: { isOpen: true, start: '09:00', end: '17:00' },
    saturday: { isOpen: false, start: '00:00', end: '00:00' },
    sunday: { isOpen: false, start: '00:00', end: '00:00' }
  };
} 