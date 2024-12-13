export interface TimeSlot {
  time: Date;
  isAvailable: boolean;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type?: 'appointment' | 'break' | 'meeting';
  staffId?: string;
  clientId?: string;
  clientName?: string;
  serviceId?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface BusinessHours {
  [key: string]: {
    isOpen: boolean;
    start: string;
    end: string;
  };
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'pink';
  schedule?: BusinessHours;
  specialties?: string[];
  isAvailable?: boolean;
} 