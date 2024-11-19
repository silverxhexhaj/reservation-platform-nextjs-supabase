export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'block' | 'break';
  clientName?: string;
  notes?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  color?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  isAvailable: boolean;
}

export interface BusinessHours {
  start: string; // Format: "HH:mm"
  end: string; // Format: "HH:mm"
  daysOfWeek: number[]; // 0-6, where 0 is Sunday
} 