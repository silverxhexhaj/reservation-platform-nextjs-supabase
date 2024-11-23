import { ReactElement } from 'react';
import { Scissors, Heart, Sun, Eye, Dumbbell, Syringe } from 'lucide-react';

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