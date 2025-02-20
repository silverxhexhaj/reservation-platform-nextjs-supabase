import { BusinessSummary } from "./businessSummary.model";

export interface HomePageBusinesses {
    top_businesses: BusinessSummary[];
    special_offers: SpecialOffer[];
    new_businesses: BusinessSummary[];
    best_rated: BusinessSummary[];
}

export interface SpecialOffer {
    deal: DealSummary;
    business: BusinessSummary;
}

export interface DealSummary {
    id: string;
    description: string;
    name: string; 
    start_date: string;
    end_date: string;
    price: number;
    is_active: boolean;
    image_url: string;
}