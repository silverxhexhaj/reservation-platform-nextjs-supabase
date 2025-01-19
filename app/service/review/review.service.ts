import { TotalReviews } from "@/app/models/functions/reviews.models";
import { supabase } from "@/lib/supabase";

export async function fetchBusinessReviews(businessId: string, pageNumber: number, pageSize: number): Promise<TotalReviews> {
    const { data, error } = await supabase.rpc('get_business_reviews', { b_id: businessId, page_number: pageNumber, page_size: pageSize })

    if (error) {
        return {
            average_rating: 0,
            total_reviews: 0,
            total_pages: 0,
            current_page: 0,
            reviews: []
        }
    }

    return data as TotalReviews
}

