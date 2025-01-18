
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
    user: UserProfile;
}

export interface TotalReviews {
    average_rating: number; 
    total_reviews: number;
    avg_rating: number;
    total_pages: number;
    current_page: number;
    reviews: Review[];
}
