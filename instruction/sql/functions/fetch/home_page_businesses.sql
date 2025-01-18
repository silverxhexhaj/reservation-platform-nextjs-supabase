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
                'category', json_build_object(
                    'id', bc.id,
                    'name', bc.name,
                    'display_name', bc.display_name,
                    'sub_categories', bc.sub_categories
                ),
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
                'review_average', ROUND(CAST((SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id) AS NUMERIC), 1)
            ))
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            LEFT JOIN business_categories bc ON b.category = bc.id
            WHERE 'top' = ANY(b.tags)
            LIMIT 5
        ),
        
        -- Special offers available today
        'special_offers', (
            SELECT ARRAY_AGG(json_build_object(
                'deal', json_build_object(
                    'id', d.id,
                    'image_url', d.image_url,
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
                    'category', json_build_object(
                        'id', bc.id,
                        'name', bc.name,
                        'display_name', bc.display_name,
                        'sub_categories', bc.sub_categories
                    ),
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
                    'review_average', ROUND(CAST((SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id) AS NUMERIC), 1)
                )
            ))
            FROM deals d
            INNER JOIN businesses b ON d.business_id = b.id
            LEFT JOIN locations l ON b.location_id = l.id
            LEFT JOIN business_categories bc ON b.category = bc.id
            WHERE d.start_date <= CURRENT_DATE 
            AND d.end_date >= CURRENT_DATE
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
                'category', json_build_object(
                    'id', bc.id,
                    'name', bc.name,
                    'display_name', bc.display_name,
                    'sub_categories', bc.sub_categories
                ),
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
                'review_average', ROUND(CAST((SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id) AS NUMERIC), 1)
            ))
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            LEFT JOIN business_categories bc ON b.category = bc.id
            WHERE b.created_at >= (CURRENT_DATE - INTERVAL '30 days')
            LIMIT 5
        ),
        
        -- Best rated businesses (4+ stars)
        'best_rated', (
            WITH review_stats AS (
                SELECT 
                    business_id,
                    COUNT(*) as review_count,
                    ROUND(CAST(AVG(rating) AS NUMERIC), 1) as review_avg
                FROM reviews
                GROUP BY business_id
                HAVING AVG(rating) >= 4.5
                ORDER BY AVG(rating) DESC
                LIMIT 5
            )
            SELECT ARRAY_AGG(json_build_object(
                'id', b.id,
                'name', b.name,
                'description', b.description,
                'image_url', b.profile_picture,
                'tags', b.tags,
                'category', json_build_object(
                    'id', bc.id,
                    'name', bc.name,
                    'display_name', bc.display_name,
                    'sub_categories', bc.sub_categories
                ),
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
                'review_count', r.review_count,
                'review_average', r.review_avg
            ))
            FROM review_stats r
            INNER JOIN businesses b ON b.id = r.business_id
            LEFT JOIN locations l ON b.location_id = l.id
            LEFT JOIN business_categories bc ON b.category = bc.id
        )
    );
END;
$$;
