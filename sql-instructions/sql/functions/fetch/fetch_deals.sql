-- Drop existing function if it exists
DROP FUNCTION IF EXISTS fetch_deals(page_number int, page_size int, category_id uuid, search_text text);

-- Create the function
CREATE OR REPLACE FUNCTION fetch_deals(
    p_page_number int DEFAULT 1,
    p_page_size int DEFAULT 10,
    p_category_id uuid DEFAULT NULL,
    p_search_text text DEFAULT NULL
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
    FROM  services s
    INNER JOIN businesses b ON s.business_id = b.id
    INNER JOIN business_categories c ON b.category = c.id
    INNER JOIN sub_categories sc on sc.id = s.sub_category
    WHERE (p_category_id IS NULL OR c.id = p_category_id)
    AND s.end_date::date >= CURRENT_TIMESTAMP::date
    AND s.is_active = true
    AND (
        p_search_text IS NULL 
        OR b.name ILIKE '%' || p_search_text || '%'
        OR s.name ILIKE '%' || p_search_text || '%'
        OR s.description ILIKE '%' || p_search_text || '%'
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
                        'is_active', s.is_active
                    ),
                    'sub_category', jsonb_build_object(
                        'id', sc.id,
                        'name', sc.name
                    ),
                    'business', jsonb_build_object(
                        'id', b.id,
                        'name', b.name,
                        'description', b.description,
                        'image_url', b.cover_picture,
                        'rating', (
                            SELECT COALESCE(AVG(rating)::numeric(10,2), 0)
                            FROM reviews r
                            WHERE r.business_id = b.id
                        )
                    )
                )
            )
            FROM  services s
            INNER JOIN businesses b ON s.business_id = b.id
            INNER JOIN business_categories c ON b.category = c.id
            INNER JOIN sub_categories sc on sc.id = s.sub_category
            WHERE (p_category_id IS NULL OR c.id = p_category_id)
            AND s.is_active = true
            AND s.end_date::date >= CURRENT_TIMESTAMP::date
            AND (
                p_search_text IS NULL 
                OR b.name ILIKE '%' || p_search_text || '%'
                OR s.name ILIKE '%' || p_search_text || '%'
                OR s.description ILIKE '%' || p_search_text || '%'
            )
            LIMIT p_page_size
            OFFSET (p_page_number - 1) * p_page_size
        )
    ) INTO result;

    RETURN result;
END;
$$;
