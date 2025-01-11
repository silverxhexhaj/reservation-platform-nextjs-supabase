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


// Helper function to format category display names
export const formatCategoryName = (category: BusinessCategory): string => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}; 




export const categoryTeams = {
  "hair_salon": [
    { name: "Emma Styles", profession: "Senior Stylist" },
    { name: "Liam Cuts", profession: "Color Specialist" },
    { name: "Olivia Shears", profession: "Junior Stylist" },
  ],
  "nail_salon": [
    { name: "Sophia Nails", profession: "Nail Technician" },
    { name: "Ava Polish", profession: "Nail Artist" },
    { name: "Mia Manicure", profession: "Pedicure Specialist" },
  ],
  "waxing_salon": [
    { name: "Isabella Smooth", profession: "Waxing Specialist" },
    { name: "Ethan Strip", profession: "Body Waxing Expert" },
    { name: "Charlotte Gentle", profession: "Facial Waxing Specialist" },
  ],
  "beauty_salon": [
    { name: "Amelia Glow", profession: "Makeup Artist" },
    { name: "Harper Beauty", profession: "Skincare Specialist" },
    { name: "Evelyn Lash", profession: "Lash Technician" },
  ],
  "barbershop": [
    { name: "Noah Razor", profession: "Master Barber" },
    { name: "William Trim", profession: "Beard Specialist" },
    { name: "James Clipper", profession: "Junior Barber" },
  ],
  "eyebrows_and_lashes": [
    { name: "Sophia Arch", profession: "Brow Artist" },
    { name: "Ava Lash", profession: "Lash Extension Specialist" },
    { name: "Mia Tint", profession: "Brow and Lash Tinting Expert" },
  ],
  "massage": [
    { name: "Oliver Knead", profession: "Massage Therapist" },
    { name: "Elijah Relax", profession: "Sports Massage Specialist" },
    { name: "Charlotte Zen", profession: "Hot Stone Massage Expert" },
  ],
  "spa": [
    { name: "Amelia Tranquil", profession: "Spa Manager" },
    { name: "Harper Serene", profession: "Facial Specialist" },
    { name: "Abigail Calm", profession: "Body Treatment Expert" },
  ],
  "gym_and_fitness": [
    { name: "Lucas Muscle", profession: "Personal Trainer" },
    { name: "Henry Cardio", profession: "Group Fitness Instructor" },
    { name: "Evelyn Flex", profession: "Yoga Instructor" },
  ],
  "personal_trainer": [
    { name: "Alexander Fit", profession: "Strength Coach" },
    { name: "Daniel Nutrition", profession: "Nutritionist" },
    { name: "Sophia Endurance", profession: "Cardio Specialist" },
  ],
  "therapy_centre": [
    { name: "Benjamin Mind", profession: "Psychotherapist" },
    { name: "Emily Counsel", profession: "Marriage Counselor" },
    { name: "Michael Heal", profession: "Art Therapist" },
  ],
  "tattoo_and_piercing": [
    { name: "Liam Ink", profession: "Tattoo Artist" },
    { name: "Olivia Pierce", profession: "Body Piercing Specialist" },
    { name: "Noah Design", profession: "Custom Tattoo Designer" },
  ],
  "tanning_studio": [
    { name: "Ava Bronze", profession: "Spray Tan Specialist" },
    { name: "Ethan Sun", profession: "Tanning Consultant" },
    { name: "Isabella Glow", profession: "Airbrush Technician" },
  ],
  "aesthetics": [
    { name: "Sophia Botox", profession: "Aesthetic Nurse" },
    { name: "William Filler", profession: "Dermal Filler Specialist" },
    { name: "Emma Laser", profession: "Laser Treatment Expert" },
  ],
  "weight_loss": [
    { name: "Oliver Slim", profession: "Weight Loss Consultant" },
    { name: "Charlotte Diet", profession: "Nutritionist" },
    { name: "James Active", profession: "Fitness Coach" },
  ],
};




export const categoryServices = {
  "hair_salon": [
    {
      name: "Haircuts",
      services: [
        { name: "Women's Haircut", price: 50, duration: 60 },
        { name: "Men's Haircut", price: 35, duration: 45 },
        { name: "Children's Haircut", price: 25, duration: 30 },
      ]
    },
    {
      name: "Coloring",
      services: [
        { name: "Full Color", price: 80, duration: 120 },
        { name: "Highlights", price: 100, duration: 150 },
        { name: "Balayage", price: 150, duration: 180 },
      ]
    },
    {
      name: "Styling",
      services: [
        { name: "Blowout", price: 40, duration: 45 },
        { name: "Updo", price: 65, duration: 60 },
        { name: "Hair Extensions", price: 200, duration: 180 },
      ]
    }
  ],
  "nail_salon": [
    {
      name: "Manicures",
      services: [
        { name: "Basic Manicure", price: 30, duration: 30 },
        { name: "Gel Manicure", price: 45, duration: 45 },
        { name: "Nail Art", price: 20, duration: 30 },
      ]
    },
    {
      name: "Pedicures",
      services: [
        { name: "Basic Pedicure", price: 40, duration: 45 },
        { name: "Spa Pedicure", price: 55, duration: 60 },
        { name: "Gel Pedicure", price: 60, duration: 60 },
      ]
    }
  ],
  "waxing_salon": [
    {
      name: "Facial Waxing",
      services: [
        { name: "Eyebrow Wax", price: 15, duration: 15 },
        { name: "Upper Lip Wax", price: 10, duration: 10 },
        { name: "Full Face Wax", price: 40, duration: 45 },
      ]
    },
    {
      name: "Body Waxing",
      services: [
        { name: "Leg Wax", price: 50, duration: 45 },
        { name: "Brazilian Wax", price: 60, duration: 45 },
        { name: "Full Body Wax", price: 150, duration: 120 },
      ]
    }
  ],
  "beauty_salon": [
    {
      name: "Facial Treatments",
      services: [
        { name: "Basic Facial", price: 70, duration: 60 },
        { name: "Deep Cleansing Facial", price: 90, duration: 75 },
        { name: "Anti-Aging Facial", price: 110, duration: 90 },
      ]
    },
    {
      name: "Makeup Services",
      services: [
        { name: "Makeup Application", price: 60, duration: 45 },
        { name: "Bridal Makeup", price: 120, duration: 90 },
        { name: "Makeup Lesson", price: 80, duration: 60 },
      ]
    },
    {
      name: "Lash and Brow Services",
      services: [
        { name: "Lash Extensions", price: 100, duration: 120 },
        { name: "Lash Lift", price: 60, duration: 45 },
        { name: "Microblading", price: 200, duration: 180 },
      ]
    }
  ],
  "barbershop": [
    {
      name: "Haircuts",
      services: [
        { name: "Men's Haircut", price: 30, duration: 30 },
        { name: "Buzz Cut", price: 20, duration: 20 },
        { name: "Kids Haircut", price: 25, duration: 30 },
      ]
    },
    {
      name: "Beard Services",
      services: [
        { name: "Beard Trim", price: 20, duration: 15 },
        { name: "Hot Shave", price: 35, duration: 30 },
        { name: "Hair & Beard Combo", price: 45, duration: 45 },
      ]
    }
  ],
  "eyebrows_and_lashes": [
    {
      name: "Eyebrow Services",
      services: [
        { name: "Eyebrow Threading", price: 15, duration: 15 },
        { name: "Eyebrow Tinting", price: 20, duration: 20 },
        { name: "Brow Lamination", price: 50, duration: 45 },
      ]
    },
    {
      name: "Lash Services",
      services: [
        { name: "Lash Lift", price: 60, duration: 45 },
        { name: "Lash Tint", price: 25, duration: 20 },
        { name: "Lash Extensions", price: 100, duration: 120 },
      ]
    }
  ],
  "massage": [
    {
      name: "Massage Services",
      services: [
        { name: "Swedish Massage", price: 80, duration: 60 },
        { name: "Deep Tissue Massage", price: 90, duration: 60 },
        { name: "Hot Stone Massage", price: 100, duration: 90 },
        { name: "Couples Massage", price: 150, duration: 90 },
      ]
    }
  ],
  "spa": [
    {
      name: "Spa Services",
      services: [
        { name: "Spa Day Package", price: 200, duration: 180 },
        { name: "Body Wrap", price: 90, duration: 60 },
        { name: "Aromatherapy Session", price: 70, duration: 60 },
        { name: "Hydrotherapy", price: 80, duration: 45 },
      ]
    }
  ],
  "gym_and_fitness": [
    {
      name: "Fitness Services",
      services: [
        { name: "Monthly Membership", price: 50, duration: 0 },
        { name: "Day Pass", price: 15, duration: 0 },
        { name: "Group Class", price: 20, duration: 60 },
        { name: "Personal Training Session", price: 60, duration: 60 },
      ]
    }
  ],
  "personal_trainer": [
    {
      name: "Personal Training Services",
      services: [
        { name: "1-on-1 Session", price: 70, duration: 60 },
        { name: "Nutrition Consultation", price: 50, duration: 45 },
        { name: "Fitness Assessment", price: 40, duration: 30 },
        { name: "10-Session Package", price: 600, duration: 600 },
      ]
    }
  ],
  "therapy_centre": [
    {
      name: "Therapy Services",
      services: [
        { name: "Individual Therapy", price: 100, duration: 60 },
        { name: "Couples Therapy", price: 130, duration: 90 },
        { name: "Group Therapy", price: 50, duration: 90 },
        { name: "Art Therapy", price: 80, duration: 60 },
      ]
    }
  ],
  "tattoo_and_piercing": [
    {
      name: "Tattoo & Piercing Services",
      services: [
        { name: "Small Tattoo", price: 80, duration: 60 },
        { name: "Large Tattoo", price: 200, duration: 180 },
        { name: "Ear Piercing", price: 30, duration: 15 },
        { name: "Body Piercing", price: 50, duration: 30 },
      ]
    }
  ],
  "tanning_studio": [
    {
      name: "Tanning Services",
      services: [
        { name: "Single Session", price: 20, duration: 15 },
        { name: "Monthly Unlimited", price: 60, duration: 0 },
        { name: "Spray Tan", price: 40, duration: 30 },
        { name: "Tanning Lotion", price: 25, duration: 0 },
      ]
    }
  ],
  "aesthetics": [
    {
      name: "Aesthetic Services",
      services: [
        { name: "Botox", price: 300, duration: 30 },
        { name: "Dermal Fillers", price: 400, duration: 45 },
        { name: "Chemical Peel", price: 150, duration: 60 },
        { name: "Microdermabrasion", price: 100, duration: 45 },
      ]
    }
  ],
  "weight_loss": [
    {
      name: "Weight Loss Services",
      services: [
        { name: "Initial Consultation", price: 50, duration: 60 },
        { name: "Weekly Check-in", price: 30, duration: 30 },
        { name: "Meal Plan", price: 100, duration: 45 },
        { name: "Body Composition Analysis", price: 40, duration: 30 },
      ]
    }
  ],
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
