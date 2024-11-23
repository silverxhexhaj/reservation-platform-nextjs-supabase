export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive';
  totalAppointments: number;
  lastVisit: string;
  totalSpent: number;
  preferredService: string;
} 