export interface BusinessOffer {
  id: string;
  businessId: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validUntil: string;
  imageUrl: string;
  category: string;
}

export const businessOffers: BusinessOffer[] = [
  {
    id: '1',
    businessId: '1', // Match this with actual business IDs
    title: 'Summer Spa Package',
    description: 'Full body massage + facial treatment',
    originalPrice: 150,
    discountedPrice: 99,
    discountPercentage: 34,
    validUntil: '2024-08-31',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    category: 'Spa Package'
  },
  {
    id: '2',
    businessId: '2',
    title: 'Hair Transformation',
    description: 'Haircut + color + treatment',
    originalPrice: 200,
    discountedPrice: 149,
    discountPercentage: 25,
    validUntil: '2024-07-31',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop',
    category: 'Hair Package'
  },
  {
    id: '3',
    businessId: '3',
    title: 'Fitness Starter Pack',
    description: '1 month membership + 3 PT sessions',
    originalPrice: 300,
    discountedPrice: 199,
    discountPercentage: 33,
    validUntil: '2024-06-30',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    category: 'Fitness Package'
  }
]; 