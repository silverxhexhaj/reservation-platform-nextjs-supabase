export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl: string;
  coverImage?: string;
  isPremium?: boolean;
  createdAt: string; // ISO date string
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  hours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  services?: {
    id: string;
    name: string;
    price: number;
    duration: number;
  }[];
  amenities?: string[];
  tags?: string[];
  galleryImages?: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
} 