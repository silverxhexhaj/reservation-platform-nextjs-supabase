export interface Location {
    id: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
}

export interface GalleryItem {
    id: string;
    image_url: string;
    thumbnail_url: string | null;
    alt_text: string | null;
    caption: string | null;
    sort_order: number;
    is_featured: boolean;
    media_type: string;
}

export interface BusinessFeature {
    id: string;
    feature_name: string;
    is_available: boolean;
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    profile_picture: string | null;
}

export interface Review {
    id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    user_id: string;
    profile: UserProfile;
}

export interface Reviews {
    average_rating: number;
    total_reviews: number;
    reviews: Review[];
}

export interface AdditionalInfo {
    id: string;
    description: string | null;
    is_available: boolean;
}

export interface BusinessStory {
    id: string;
    title: string;
    image_url: string;
    is_available: boolean;
}

export interface BusinessDetails {
    id: string;
    name: string;
    description: string | null;
    category: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    external_link_facebook: string | null;
    external_link_instagram: string | null;
    external_link_tiktok: string | null;
    external_link_linkedin: string | null;
    for_men: boolean | null;
    for_women: boolean | null;
    for_both: boolean | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
    location: Location;
    gallery: GalleryItem[];
    features: BusinessFeature[];
    reviews: Reviews;
    additional_info: AdditionalInfo[];
    business_story: BusinessStory[];
}