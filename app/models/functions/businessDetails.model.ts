export interface Location {
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
}

export interface GalleryItem {
    id: string;
    image_url: string;
    thumbnail_url: string;
    description: string;
}

export interface BusinessFeature {
    id: string;
    name: string;
    is_available: boolean;
}

export interface WorkingHours {
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
}

export interface StaffProfile {
    first_name: string;
    last_name: string;
    profile_picture: string;
    bio: string;
    preferred_language: string;
    specialties: string[];
    years_of_experience: number;
    education: string;
    certifications: string;
    languages: string;
}

export interface StaffService {
    id: string;
    name: string;
    description: string;
    duration: number;
    base_price: number;
}

export interface Staff {
    id: string;
    position: string;
    is_active: boolean;
    user_id: string;
    profile: StaffProfile;
    services: StaffService[];
}

export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number;
    base_price: number;
    is_active: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    is_active: boolean;
}

export interface Offer {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    original_price: number;
    now_price: number;
}

export interface AdditionalInfo {
    id: string;
    description: string;
    is_available: boolean;
}

export interface BusinessStory {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    is_available: boolean;
}


export interface Business {
    id: string;
    name: string;
    description: string;
    category: string;
    price_range: string;
    phone: string;
    website_url: string;
    profile_picture: string;
    cover_picture: string;
    is_premium: boolean;
    tags: string[];
    external_link_facebook: string;
    external_link_instagram: string;
    external_link_tiktok: string;
    external_link_linkedin: string;
    for_men: boolean;
    for_women: boolean;
    for_both: boolean;
    created_at: string;
    location: Location;
}

export interface BusinessDetails {
    business: Business;
    gallery: GalleryItem[];
    features: BusinessFeature[];
    working_hours: WorkingHours[];
    staff: Staff[];
    services: Service[];
    products: Product[];
    offers: Offer[];
    additional_info: AdditionalInfo[];
    business_story: BusinessStory[];
}