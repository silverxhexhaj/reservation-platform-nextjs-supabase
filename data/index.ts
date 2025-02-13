import { BusinessCategory } from '@/app/models/supabase.models';

// Types
export interface Service {
  name: string;
  price: number;
}

export interface ServiceCategory {
  name: string;
  services: Service[];
}

export interface TeamMember {
  name: string;
  profession: string;
}

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

export interface Business {
  id: string;
  name: string;
  description: string;
  category: BusinessCategory;
  rating: number;
  reviewCount: number;
  priceRange: string;
  imageUrl: string;
  isPremium?: boolean;
  createdAt: string;
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

export type CategoryIconType = 'scissors' | 'heart' | 'sun' | 'eye' | 'dumbbell' | 'syringe' | 'yoga' | 'flower' | 'tooth' | 'activity' | 'stethoscope' | 'needle' | 'sparkles' | 'gem' | 'paintbrush' | 'zap';

export const categoryToIcon: Record<BusinessCategory, CategoryIconType> = {
  hair_salon: 'scissors',
  nail_salon: 'gem',
  waxing_salon: 'sparkles',
  beauty_salon: 'heart',
  barbershop: 'scissors',
  eyebrows_and_lashes: 'eye',
  massage: 'flower',
  spa: 'sparkles',
  gym_and_fitness: 'dumbbell',
  personal_trainer: 'activity',
  therapy_centre: 'heart',
  tattoo_and_piercing: 'needle',
  tanning_studio: 'sun',
  aesthetics: 'gem',
  weight_loss: 'activity',
  yoga_studio: 'yoga',
  pilates_studio: 'yoga',
  dental_clinic: 'tooth',
  chiropractor: 'stethoscope',
  physiotherapy: 'activity',
  acupuncture: 'needle',
  meditation_centre: 'flower',
  wellness_centre: 'sparkles',
  makeup_artist: 'paintbrush',
  hair_removal: 'zap'
};




export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    content: "Nooor has transformed how I book my beauty appointments. The platform is so intuitive and reliable!",
    rating: 5
  },
  {
    name: "Mark Davis",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    content: "Finding the right personal trainer was super easy with Nooor. The booking process is seamless.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Beauty Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    content: "As a salon owner, Nooor has helped me reach more clients and manage my bookings efficiently.",
    rating: 5
  }
];
