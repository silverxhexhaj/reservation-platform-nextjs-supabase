DROP FUNCTION IF EXISTS get_business_reviews(b_id UUID, page_number INTEGER, page_size INTEGER);

CREATE OR REPLACE FUNCTION get_business_reviews(
    b_id UUID,
    page_number INTEGER DEFAULT 1,
    page_size INTEGER DEFAULT 10
)
RETURNS JSON AS $$
DECLARE
    total_count INTEGER;
    total_pages INTEGER;
    avg_rating DECIMAL;
    current_reviews JSON;
BEGIN
    -- Get total count and average rating
    SELECT 
        COUNT(*),
        COALESCE(AVG(rating), 0)
    INTO 
        total_count,
        avg_rating
    FROM reviews rev
    WHERE rev.business_id = b_id 
    AND rev.is_published = true;

    -- Calculate total pages
    total_pages := CEIL(total_count::DECIMAL / page_size);

    -- Get paginated reviews with user info
    WITH paginated_reviews AS (
        SELECT 
            r.id,
            r.rating,
            r.comment,
            r.created_at,
            p.first_name,
            p.last_name,
            p.profile_picture,
            r.user_id
        FROM reviews r
        LEFT JOIN profiles p ON p.user_id = r.user_id
        WHERE r.business_id = b_id 
        AND r.is_published = true
        ORDER BY r.created_at DESC
        LIMIT page_size
        OFFSET ((page_number - 1) * page_size)
    )
    SELECT json_build_object(
        'average_rating', ROUND(avg_rating::NUMERIC, 1),
        'total_reviews', total_count,
        'total_pages', total_pages,
        'current_page', page_number,
        'reviews', COALESCE(json_agg(
            json_build_object(
                'id', pr.id,
                'rating', pr.rating,
                'comment', pr.comment,
                'created_at', pr.created_at,
                'user_id', pr.user_id,
                'user', json_build_object(
                    'first_name', pr.first_name,
                    'last_name', pr.last_name,
                    'profile_picture', pr.profile_picture
                )
            )
        ), '[]'::json)
    ) INTO current_reviews
    FROM paginated_reviews pr;

    RETURN current_reviews;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
