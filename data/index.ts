import { ReactElement } from 'react';
import { Scissors, Heart, Sun, Eye, Dumbbell, Syringe } from 'lucide-react';

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
  category: Category;
  rating: number;
  priceRange: string;
  imageUrl: string;
  galleryImages: string[];
  createdAt: string;
  services: ServiceCategory[];
  team: TeamMember[];
  offers?: BusinessOffer[];
}

// Categories
export const categories = [
  "Hair Salon",
  "Nail Salon",
  "Waxing Salon",
  "Beauty Salon",
  "Barbershop",
  "Eyebrows & Lashes",
  "Massage",
  "Spa",
  "Gym & Fitness",
  "Personal Trainer",
  "Therapy Centre",
  "Tattoo & Piercing",
  "Tanning Studio",
  "Aesthetics",
  "Weight Loss"
] as const;

export type Category = typeof categories[number];

export type CategoryIconType = 
  | "scissors"
  | "heart"
  | "sun"
  | "eye"
  | "dumbbell"
  | "syringe";

export const categoryToIcon: Record<Category, CategoryIconType> = {
  "Hair Salon": "scissors",
  "Nail Salon": "heart",
  "Waxing Salon": "sun",
  "Beauty Salon": "heart",
  "Barbershop": "scissors",
  "Eyebrows & Lashes": "eye",
  "Massage": "heart",
  "Spa": "heart",
  "Gym & Fitness": "dumbbell",
  "Personal Trainer": "dumbbell",
  "Therapy Centre": "heart",
  "Tattoo & Piercing": "syringe",
  "Tanning Studio": "sun",
  "Aesthetics": "syringe",
  "Weight Loss": "dumbbell"
};

// Category Images
export const categoryImages: Record<Category, string> = {
  "Hair Salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Nail Salon": "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Waxing Salon": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Beauty Salon": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Barbershop": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Eyebrows & Lashes": "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Spa": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Gym & Fitness": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Personal Trainer": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Therapy Centre": "https://images.unsplash.com/photo-1598257006458-087169a1f08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Tattoo & Piercing": "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Tanning Studio": "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Aesthetics": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "Weight Loss": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
}; 