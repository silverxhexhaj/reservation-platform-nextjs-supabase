-- Drop existing function if it exists
DROP FUNCTION IF EXISTS fetch_home_page_businesses;

-- Create function to fetch home page businesses
CREATE OR REPLACE FUNCTION fetch_home_page_businesses()
RETURNS json
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN json_build_object(
        -- Top businesses (tagged as 'top')
        'top_businesses', (
            SELECT ARRAY_AGG(json_build_object(
                'id', b.id,
                'name', b.name,
                'description', b.description,
                'image_url', b.cover_picture,
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
            ))
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            WHERE 'top' = ANY(b.tags)
            LIMIT 5
        ),
        
        -- Special offers available today
        'special_offers', (
            SELECT ARRAY_AGG(json_build_object(
                'deal', json_build_object(
                    'id', d.id,
                    'description', d.description,
                    'title', d.title,
                    'start_date', d.start_date,
                    'end_date', d.end_date,
                    'original_price', d.original_price,
                    'now_price', d.now_price,
                    'is_active', d.is_active
                ),
                'business', json_build_object(
                    'id', b.id,
                    'name', b.name,
                    'image_url', b.cover_picture,
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
                )
            ))
            FROM deals d
            INNER JOIN businesses b ON d.business_id = b.id
            LEFT JOIN locations l ON b.location_id = l.id
            WHERE d.valid_from <= CURRENT_DATE 
            AND d.valid_until >= CURRENT_DATE
            LIMIT 5
        ),
        
        -- New businesses (last 30 days)
        'new_businesses', (
            SELECT ARRAY_AGG(json_build_object(
                'id', b.id,
                'name', b.name,
                'description', b.description,
                'image_url', b.cover_picture,
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
            ))
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            WHERE b.created_at >= (CURRENT_DATE - INTERVAL '30 days')
            LIMIT 5
        ),
        
        -- Best rated businesses (4+ stars)
        'best_rated', (
            SELECT ARRAY_AGG(json_build_object(
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
                'review_count', review_count,
                'review_average', review_avg
            ))
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            INNER JOIN (
                SELECT 
                    business_id,
                    COUNT(*) as review_count,
                    AVG(rating) as review_avg
                FROM reviews
                GROUP BY business_id
                HAVING AVG(rating) >= 4
            ) r ON b.id = r.business_id
            ORDER BY r.review_avg DESC
            LIMIT 5
        )
    );
END;
$$;
