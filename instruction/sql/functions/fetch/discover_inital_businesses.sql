DROP FUNCTION IF EXISTS load_initial_businesses;

CREATE OR REPLACE FUNCTION load_initial_businesses()
RETURNS json LANGUAGE plpgsql AS $$
DECLARE
    result_json json;
BEGIN
    WITH results AS (
        SELECT 
            -- Popular businesses with 'popular' tag
            ARRAY(
                SELECT json_build_object(
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
                    'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
                    'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
                )
                FROM businesses b
                LEFT JOIN locations l ON b.location_id = l.id
                LEFT JOIN business_categories bc ON b.category = bc.id
                WHERE 'popular' = ANY(b.tags)
                LIMIT 5
            ) as popular,
            
            -- Random businesses
            ARRAY(
                SELECT json_build_object(
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
                    'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
                    'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
                )
                FROM businesses b
                LEFT JOIN locations l ON b.location_id = l.id
                LEFT JOIN business_categories bc ON b.category = bc.id
                ORDER BY RANDOM()
                LIMIT 5
            ) as all_businesses,
            
            -- Businesses for women
            ARRAY(
                SELECT json_build_object(
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
                    'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
                    'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
                )
                FROM businesses b
                LEFT JOIN locations l ON b.location_id = l.id
                LEFT JOIN business_categories bc ON b.category = bc.id
                WHERE b.for_women = true
                LIMIT 5
            ) as for_women,
            
            -- Businesses for men
            ARRAY(
                SELECT json_build_object(
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
                    'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
                    'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
                )
                FROM businesses b
                LEFT JOIN locations l ON b.location_id = l.id
                LEFT JOIN business_categories bc ON b.category = bc.id
                WHERE b.for_men = true
                LIMIT 5
            ) as for_men,

            -- Premium businesses
            ARRAY(
                SELECT json_build_object(
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
                    'review_count', (SELECT COUNT(*) FROM reviews r WHERE r.business_id = b.id),
                    'review_average', (SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.business_id = b.id)
                )
                FROM businesses b
                LEFT JOIN locations l ON b.location_id = l.id
                LEFT JOIN business_categories bc ON b.category = bc.id
                WHERE b.is_premium = true
                LIMIT 5
            ) as premium
    )
    SELECT json_build_object(
        'popular', popular,
        'all_businesses', all_businesses,
        'for_women', for_women,
        'for_men', for_men,
        'premium', premium
    ) INTO result_json
    FROM results;

    RETURN result_json;
END;
$$;
