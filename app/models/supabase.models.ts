// Enum Types
export type CampaignStatus = 'draft' | 'active' | 'inactive' | 'expired';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';
export type ProfileType = 'client' | 'staff';

// Price range type (1 = $, 2 = $$, 3 = $$$, 4 = $$$$)
export type PriceRange = 1 | 2 | 3 | 4;

export type BusinessCategory = 
  | 'hair_salon'
  | 'nail_salon'
  | 'waxing_salon'
  | 'beauty_salon'
  | 'barbershop'
  | 'eyebrows_and_lashes'
  | 'massage'
  | 'spa'
  | 'gym_and_fitness'
  | 'personal_trainer'
  | 'therapy_centre'
  | 'tattoo_and_piercing'
  | 'tanning_studio'
  | 'aesthetics'
  | 'weight_loss'
  | 'yoga_studio'
  | 'pilates_studio'
  | 'dental_clinic'
  | 'chiropractor'
  | 'physiotherapy'
  | 'acupuncture'
  | 'meditation_centre'
  | 'wellness_centre'
  | 'makeup_artist'
  | 'hair_removal'
  | 'cosmetics'
  | 'hair_stylist'
  | 'manicure'
  | 'weight_loss';
  

export const businessCategories: BusinessCategory[] = [
  'hair_salon',
  'nail_salon', 
  'waxing_salon',
  'beauty_salon',
  'barbershop',
  'eyebrows_and_lashes',
  'massage',
  'spa',
  'gym_and_fitness',
  'personal_trainer',
  'therapy_centre',
  'tattoo_and_piercing',
  'tanning_studio',
  'aesthetics',
  'weight_loss',
  'yoga_studio',
  'pilates_studio',
  'dental_clinic',
  'chiropractor',
  'physiotherapy',
  'acupuncture',
  'meditation_centre',
  'wellness_centre',
  'makeup_artist',
  'hair_removal',
  'cosmetics',
  'hair_stylist',
  'manicure',
  'weight_loss'
];


export type NotificationType = 
  | 'booking_created'
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_completed'
  | 'booking_rescheduled'
  | 'payment_received'
  | 'payment_failed'
  | 'campaign_started'
  | 'deal_available'
  | 'points_earned'
  | 'points_redeemed'
  | 'reward_claimed'
  | 'schedule_changed';

// Base interface for timestamps
interface Timestamps {
  created_at: string;
  updated_at: string;
}

// Client Profile
export interface Client extends Timestamps {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string | null;
  phone?: string | null;
}

// Notification
export interface Notification extends Timestamps {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  reference_id?: string | null;
  reference_type?: string | null;
  is_read: boolean;
}


export interface Category extends Timestamps {
  id: string;
  name: string;
  display_name: string;
}

export interface SubCategory extends Timestamps {
  id: string;
  category_id: string;
  name: string;
  display_name: string;
  description?: string | null;
  is_active: boolean;
}

// Business
export interface Business extends Timestamps {
  id: string;
  name: string;
  description?: string | null;
  category: Category;
  price_range: PriceRange;
  phone?: string | null;
  website_url?: string | null;
  profile_picture?: string | null;
  cover_picture?: string | null;
  is_premium: boolean;
  tags?: string[] | null;
  external_link_facebook?: string | null;
  external_link_instagram?: string | null;
  external_link_tiktok?: string | null;
  external_link_linkedin?: string | null;
  owner_id: string;
}

// Business Feature
export interface BusinessFeature extends Timestamps {
  id: string;
  business_id: string;
  feature_name: string;
  is_available: boolean;
}

// Business Gallery
export interface BusinessGallery extends Timestamps {
  id: string;
  business_id: string;
  image_url: string;
  thumbnail_url?: string | null;
  alt_text?: string | null;
  caption?: string | null;
  sort_order: number;
  is_featured: boolean;
  media_type: string;
}

// Location
export interface Location extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  address: string;
  city: string;
  state?: string | null;
  country: string;
  postal_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  phone?: string | null;
  is_main_location: boolean;
  is_active: boolean;
  timezone: string;
}

// Business Staff
export interface BusinessStaff extends Timestamps {
  id: string;
  business_id: string;
  user_id: string;
  position?: string | null;
  is_active: boolean;
}

// Staff Working Hours
export interface StaffWorkingHours extends Timestamps {
  id: string;
  staff_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string;
  end_time: string;
  hourly_rate: number;
  is_available: boolean;
}

// Service
export interface Service extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  duration: number; // in minutes
  base_price: number;
  is_active: boolean;
}

// Product
export interface Product extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  price: number;
  stock_quantity?: number | null;
  is_active: boolean;
}

// Staff Service
export interface StaffService {
  id: string;
  staff_id: string;
  service_id: string;
  created_at: string;
}

// Campaign
export interface Campaign extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  start_date: string;
  end_date: string;
  status: CampaignStatus;
}

// Deal
export interface Deal extends Timestamps {
  id: string;
  campaign_id: string;
  service_id: string;
  discount_percentage?: number | null;
  discount_amount?: number | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

// Loyalty Points
export interface LoyaltyPoints extends Timestamps {
  id: string;
  user_id: string;
  points_balance: number;
  total_points_earned: number;
  total_points_spent: number;
}

// Points Transaction
export interface PointsTransaction {
  id: string;
  user_id: string;
  points_amount: number;
  transaction_type: 'earn' | 'redeem'; // Added specific types
  reference_id?: string | null;
  created_at: string;
}

// Time Slot
export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
}

// Reward
export interface Reward extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  points_required: number;
  is_active: boolean;
}

// Redeemed Reward
export interface RedeemedReward {
  id: string;
  user_id: string;
  reward_id: string;
  points_spent: number;
  redeemed_at: string;
  expiry_date?: string | null;
  is_used: boolean;
}

// Booking
export interface Booking extends Timestamps {
  id: string;
  user_id: string;
  business_id: string;
  staff_id: string;
  service_id: string;
  deal_id?: string | null;
  booking_date: string;
  status: BookingStatus;
  total_amount: number;
  notes?: string | null;
}

// Payment
export interface Payment extends Timestamps {
  id: string;
  booking_id: string;
  amount: number;
  status: PaymentStatus;
  payment_method?: string | null;
  stripe_payment_id?: string | null;
}

// Review
export interface Review extends Timestamps {
  id: string;
  business_id?: string | null;
  staff_id?: string | null;
  user_id: string;
  booking_id?: string | null;
  rating: number; // CHECK (rating BETWEEN 1 AND 5)
  comment?: string | null;
  review_type: 'business' | 'staff';
  is_published: boolean;
}

// Profile
export interface Profile extends Timestamps {
  id: string;
  user_id: string;
  profile_type: ProfileType;
  bio?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  preferred_language?: string | null;
  specialties?: string[] | null;
  years_of_experience?: number | null;
  education?: string[] | null;
  certifications?: string[] | null;
  languages?: string[] | null;
}

// Loyalty Points
export interface LoyaltyPoints extends Timestamps {
  id: string;
  user_id: string;
  points_balance: number;
  total_points_earned: number;
  total_points_spent: number;
}

// Points Transaction
export interface PointsTransaction extends Timestamps {
  id: string;
  user_id: string;
  points_amount: number;
  transaction_type: 'earn' | 'redeem';
  reference_id?: string | null;
}

// Reward
export interface Reward extends Timestamps {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  points_required: number;
  is_active: boolean;
}

// Redeemed Reward
export interface RedeemedReward extends Timestamps {
  id: string;
  user_id: string;
  reward_id: string;
  points_spent: number;
  redeemed_at: string;
  expiry_date?: string | null;
  is_used: boolean;
}

// Deal
export interface Deal extends Timestamps {
  id: string;
  campaign_id: string;
  service_id: string;
  discount_percentage?: number | null;
  discount_amount?: number | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface BusinessFavorite extends Timestamps {
  id: string;
  user_id: string;
  business_id: string;
}
