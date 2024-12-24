export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  galleryImages: string[];
  createdAt: string;
}

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Zen Spa & Wellness',
    description: 'Luxury spa treatments',
    category: 'Spa',
    rating: 4.8,
    priceRange: '$$$',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    galleryImages: [],
    createdAt: '2024-01-15'
  },
]; 