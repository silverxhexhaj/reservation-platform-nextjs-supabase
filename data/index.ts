import { ReactElement } from 'react';
import { Scissors, Heart, Sun, Eye, Dumbbell, Syringe, Yoga, Flower2, Tooth, Activity, Stethoscope, Needle, Sparkles, Gem, Paintbrush, Zap } from 'lucide-react';
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

// Category Images
export const categoryImages: Record<BusinessCategory, string> = {
  hair_salon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  nail_salon: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  waxing_salon: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  beauty_salon: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  barbershop: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  eyebrows_and_lashes: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  massage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  gym_and_fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  personal_trainer: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  therapy_centre: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  tattoo_and_piercing: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  tanning_studio: "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  aesthetics: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  weight_loss: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  yoga_studio: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  pilates_studio: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  dental_clinic: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  chiropractor: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  physiotherapy: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  acupuncture: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  meditation_centre: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  wellness_centre: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  makeup_artist: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  hair_removal: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
}; 

// Helper function to format category display names
export const formatCategoryName = (category: BusinessCategory): string => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}; 