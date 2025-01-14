import { TotalReviews } from "@/app/models/functions/reviews.models";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export async function fetchBusinessReviews(businessId: string, pageNumber: number, pageSize: number): Promise<TotalReviews> {
    const { data, error } = await supabase.rpc('get_business_reviews', { b_id: businessId, page_number: pageNumber, page_size: pageSize })

    console.log(data)
    

    if (error) {
        return {
            avg_rating: 0,
            total_count: 0,
            total_pages: 0,
            current_reviews: []
        }
    }

    return data as TotalReviews
}

