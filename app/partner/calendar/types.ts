export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'break' | 'meeting';
  clientName?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  color: string;
  staffId?: string;
}

export interface BusinessHours {
  [key: string]: {
    start: string;
    end: string;
    isOpen: boolean;
  };
}

export interface Staff {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  color: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  isAvailable: boolean;
} 