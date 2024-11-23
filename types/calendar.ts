export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'block';
  staffId: string;
  clientId?: string;
  clientName?: string;
  serviceId?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  color?: string;
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
  avatar: string;
}

export interface Client {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  color: string;
} 