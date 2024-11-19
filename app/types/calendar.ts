export interface Staff {
  id: string;
  name: string;
  role: string;
  color: 'blue' | 'green' | 'purple';
  avatar: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  clientName?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  staffId: string;
}

export interface BusinessHours {
  [key: string]: {
    isOpen: boolean;
    start: string;
    end: string;
  };
} 