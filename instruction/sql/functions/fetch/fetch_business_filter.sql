-- Create a function to fetch businesses with filters
CREATE OR REPLACE FUNCTION fetch_businesses_with_filters(
    search_term TEXT DEFAULT NULL,
    selected_categories business_category[] DEFAULT NULL,
    is_premium BOOLEAN DEFAULT NULL,
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    description TEXT,
    category business_category,
    price_range INTEGER,
    cover_picture TEXT,
    is_premium BOOLEAN,
    tags TEXT[],
    owner_id UUID,
    location JSON,
    average_rating DECIMAL(3,2),
    review_count INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    WITH review_stats AS (
        SELECT 
            business_id,
            COALESCE(AVG(rating)::DECIMAL(3,2), 0) as average_rating,
            COUNT(*) as review_count
        FROM reviews
        WHERE review_type = 'business'
        GROUP BY business_id
    )
    SELECT 
        b.id,
        b.name,
        b.description,
        b.category,
        b.price_range,
        b.cover_picture,
        b.is_premium,
        b.tags,
        b.owner_id,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'address', l.address,
            'city', l.city,
            'state', l.state,
            'country', l.country,
            'postal_code', l.postal_code,
            'latitude', l.latitude,
            'longitude', l.longitude,
            'timezone', l.timezone
        ) as location,
        COALESCE(rs.average_rating, 0) as average_rating,
        COALESCE(rs.review_count, 0) as review_count
    FROM businesses b
    LEFT JOIN locations l ON l.business_id = b.id AND l.is_main_location = true
    LEFT JOIN review_stats rs ON rs.business_id = b.id
    WHERE 
        -- Search term filter
        (search_term IS NULL OR 
         b.name ILIKE '%' || search_term || '%' OR
         b.description ILIKE '%' || search_term || '%')
        AND
        -- Categories filter
        (selected_categories IS NULL OR b.category = ANY(selected_categories))
        AND
        -- Premium filter
        (is_premium IS NULL OR b.is_premium = is_premium)
    ORDER BY 
        b.is_premium DESC,
        rs.average_rating DESC NULLS LAST,
        b.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$;
