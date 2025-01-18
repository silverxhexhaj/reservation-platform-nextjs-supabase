import { Category } from "../supabase.models";

export interface LoadInitialBusinessesResponse {
    popular?: BusinessSummary[];
    all_businesses?: BusinessSummary[];
    for_women?: BusinessSummary[];
    for_men?: BusinessSummary[];
    premium?: BusinessSummary[];
}

export interface BusinessSummary {
    id?: string;
    name: string;
    description?: string | null;
    image_url?: string | null;
    tags?: string[] | null;
    category?: Category;
    price_range?: number;
    is_premium?: boolean;
    location?: BusinessLocation;
    review_count?: number;
    review_average?: number;
    created_at?: string;
}

export interface BusinessLocation {
    id?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string | null;
    country: string;
}
