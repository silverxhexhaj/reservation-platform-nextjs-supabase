export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  // ... other business properties
}

export interface BusinessCardProps {
  business: Business;
} 