import { ProfileType } from "./supabase.models";

export interface SignUpOptions {
    profile: ProfileType;
  
    firstName: string;
    lastName: string;
    phone: string,
  
    businessName?: string;
    category?: string;
    description?: string;
    priceRange?: string;
    roadName?: string;
    floor?: string;
    side?: string;
    cityCode?: string;
    citySection?: string;
    cityName?: string;
    country?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  }