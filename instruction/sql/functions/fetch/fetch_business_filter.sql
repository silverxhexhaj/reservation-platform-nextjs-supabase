DROP FUNCTION IF EXISTS fetch_businesses_with_filters;

CREATE OR REPLACE FUNCTION fetch_businesses_with_filters(
    search_term TEXT DEFAULT NULL,
    selected_category business_category DEFAULT NULL,
    limit_count INTEGER DEFAULT 25,
    offset_count INTEGER DEFAULT 0
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result_json json;
BEGIN
    WITH filtered_businesses AS (
        SELECT json_build_object(
            'id', b.id,
            'name', b.name,
            'description', b.description,
            'image_url', b.profile_picture,
            'tags', b.tags,
            'category', b.category,
            'price_range', b.price_range,
            'is_premium', b.is_premium,
            'created_at', b.created_at,
            'location', json_build_object(
                'id', l.id,
                'name', l.name,
                'address', l.address,
                'city', l.city,
                'state', l.state,
                'country', l.country
            ),
            'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
            'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
        ) as business_json
        FROM businesses b
        LEFT JOIN locations l ON b.location_id = l.id
        WHERE 
            (
                CASE 
                    WHEN search_term IS NULL THEN true
                    ELSE b.name ILIKE '%' || search_term || '%' OR b.description ILIKE '%' || search_term || '%'
                END
            )
            AND
            (selected_category IS NULL OR b.category = selected_category)
        ORDER BY 
            b.is_premium DESC,
            (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id) DESC,
            b.created_at DESC
        LIMIT limit_count
        OFFSET offset_count
    )
    SELECT json_agg(business_json) INTO result_json
    FROM filtered_businesses;

    RETURN COALESCE(result_json, '[]'::json);
END;
$$;

