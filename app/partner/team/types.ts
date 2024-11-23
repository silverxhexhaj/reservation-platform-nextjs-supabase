export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
  rating: number;
  appointments: number;
  joinedDate: string;
} 