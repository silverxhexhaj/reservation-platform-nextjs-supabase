-- Drop existing function if it exists
DROP FUNCTION IF EXISTS fetch_deals(page_number int, page_size int, category_id uuid, search_text text);

-- Create the function
CREATE OR REPLACE FUNCTION fetch_deals(
    page_number int DEFAULT 1,
    page_size int DEFAULT 10,
    category_id uuid DEFAULT NULL,
    search_text text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result jsonb;
    total_count bigint;
BEGIN
    -- Get total count
    SELECT COUNT(*)::bigint INTO total_count
    FROM services s
    INNER JOIN businesses b ON s.business_id = b.id
    WHERE (category_id IS NULL OR s.sub_category = fetch_deals.category_id)
    AND s.end_date > CURRENT_TIMESTAMP
    AND (
        search_text IS NULL 
        OR b.name ILIKE '%' || search_text || '%'
        OR s.name ILIKE '%' || search_text || '%'
        OR s.description ILIKE '%' || search_text || '%'
    );

    -- Build result with count and items array
    SELECT jsonb_build_object(
        'count', total_count,
        'items', (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'deal', jsonb_build_object(
                        'id', s.id,
                        'name', s.name,
                        'description', s.description,
                        'price', s.price,
                        'start_date', s.start_date,
                        'end_date', s.end_date,
                        'is_active', s.is_active,
                        'created_at', s.created_at
                    ),
                    'category', jsonb_build_object(
                        'id', c.id,
                        'name', c.name
                    ),
                    'business', jsonb_build_object(
                        'id', b.id,
                        'name', b.name,
                        'description', b.description,
                        'image_url', b.image_url,
                        'rating', (
                            SELECT COALESCE(AVG(rating)::numeric(10,2), 0)
                            FROM reviews r
                            WHERE r.business_id = b.id
                        )
                    )
                )
            )
            FROM services s
            INNER JOIN businesses b ON s.business_id = b.id
            INNER JOIN categories c ON s.sub_category = c.id
            WHERE (fetch_deals.category_id IS NULL OR s.sub_category = fetch_deals.category_id)
            AND s.is_active = true
            AND s.end_date > CURRENT_TIMESTAMP
            AND (
                fetch_deals.search_text IS NULL 
                OR b.name ILIKE '%' || fetch_deals.search_text || '%'
                OR s.name ILIKE '%' || fetch_deals.search_text || '%'
                OR s.description ILIKE '%' || fetch_deals.search_text || '%'
            )
            ORDER BY s.created_at DESC
            LIMIT page_size
            OFFSET (page_number - 1) * page_size
        )
    ) INTO result;

    RETURN result;
END;
$$;

-- Add comment to the function
COMMENT ON FUNCTION fetch_deals IS 'Fetches active deals (end_date > current time) with pagination, filtering by category_id and search text (matches business name, deal title or description), returning count and array of deals with their related business and category information';

/*
TypeScript interface for the function response:

interface DealItem {
  deal: {
    id: string;
    title: string;
    description: string;
    price: number;
    discount_price: number;
    start_date: string;
    end_date: string;
    created_at: string;
  };
  category: {
    id: string;
    name: string;
  };
  business: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    rating: number;
  };
}

interface DealsResponse {
  count: number;
  items: DealItem[];
}

Example usage:
const { data, error } = await supabase
  .rpc('fetch_deals', { 
    page_number: 1,
    page_size: 10,
    category_id: 'optional-category-uuid',
    search_text: 'optional search text'
  });
*/
