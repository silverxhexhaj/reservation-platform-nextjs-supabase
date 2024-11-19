import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  addMinutes,
  isWithinInterval,
  isSameDay,
  setHours,
  setMinutes
} from 'date-fns';
import type { CalendarEvent, TimeSlot, BusinessHours } from '@/types/calendar';

export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
}

export function generateTimeSlots(
  date: Date, 
  businessHours: BusinessHours,
  events: CalendarEvent[],
  slotDuration: number = 30
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const [startHour, startMinute] = businessHours.start.split(':').map(Number);
  const [endHour, endMinute] = businessHours.end.split(':').map(Number);

  const dayStart = setMinutes(setHours(date, startHour), startMinute);
  const dayEnd = setMinutes(setHours(date, endHour), endMinute);

  let currentSlot = dayStart;

  while (currentSlot < dayEnd) {
    const slotEnd = addMinutes(currentSlot, slotDuration);
    
    const isSlotAvailable = !events.some(event => 
      isSameDay(currentSlot, event.start) &&
      isWithinInterval(currentSlot, { start: event.start, end: event.end })
    );

    slots.push({
      start: currentSlot,
      end: slotEnd,
      isAvailable: isSlotAvailable
    });

    currentSlot = slotEnd;
  }

  return slots;
}

export function formatEventTime(date: Date): string {
  return format(date, 'HH:mm');
}

export function getEventColor(event: CalendarEvent): string {
  const colors = {
    appointment: 'bg-blue-100 text-blue-800',
    block: 'bg-red-100 text-red-800',
    break: 'bg-gray-100 text-gray-800'
  } as const;
  
  return colors[event.type] || colors.appointment;
}

export function checkEventOverlap(
  event: Partial<CalendarEvent>, 
  existingEvents: CalendarEvent[]
): boolean {
  if (!event.start || !event.end) return false;

  return existingEvents.some(existing => 
    isSameDay(event.start!, existing.start) &&
    !(event.end! <= existing.start || event.start! >= existing.end)
  );
}

export function getDefaultBusinessHours(): BusinessHours {
  return {
    monday: { start: '09:00', end: '17:00', isOpen: true },
    tuesday: { start: '09:00', end: '17:00', isOpen: true },
    wednesday: { start: '09:00', end: '17:00', isOpen: true },
    thursday: { start: '09:00', end: '17:00', isOpen: true },
    friday: { start: '09:00', end: '17:00', isOpen: true },
    saturday: { start: '10:00', end: '15:00', isOpen: true },
    sunday: { start: '00:00', end: '00:00', isOpen: false },
  };
}

export function isWithinBusinessHours(time: Date, businessHours: BusinessHours): boolean {
  const dayOfWeek = format(time, 'EEEE').toLowerCase();
  const timeStr = format(time, 'HH:mm');
  
  const daySchedule = businessHours[dayOfWeek];
  if (!daySchedule || !daySchedule.isOpen) return false;
  
  return timeStr >= daySchedule.start && timeStr < daySchedule.end;
} 