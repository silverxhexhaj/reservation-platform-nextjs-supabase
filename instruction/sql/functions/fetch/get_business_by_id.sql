DROP FUNCTION IF EXISTS get_business_by_id(b_id UUID);

CREATE OR REPLACE FUNCTION get_business_by_id(b_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'business', (
            SELECT json_build_object(
                'id', b.id,
                'name', b.name,
                'description', b.description,
                'category', json_build_object(
                    'id', bc.id,
                    'name', bc.name,
                    'display_name', bc.display_name
                ),
                'sub_categories', (
                    SELECT json_agg(
                        json_build_object(
                            'id', sc.id,
                            'name', sc.name,
                            'display_name', sc.display_name
                        )
                    )
                    FROM sub_categories sc
                    WHERE sc.category_id = bc.id
                ),
                'price_range', b.price_range,
                'phone', b.phone,
                'website_url', b.website_url,
                'profile_picture', b.profile_picture,
                'cover_picture', b.cover_picture,
                'is_premium', b.is_premium,
                'tags', b.tags,
                'external_link_facebook', b.external_link_facebook,
                'external_link_instagram', b.external_link_instagram,
                'external_link_tiktok', b.external_link_tiktok,
                'external_link_linkedin', b.external_link_linkedin,
                'for_men', b.for_men,
                'for_women', b.for_women,
                'for_both', b.for_both,
                'created_at', b.created_at,
                'location', (
                    SELECT json_build_object(
                        'address', l.address,
                        'city', l.city,
                        'state', l.state,
                        'country', l.country,
                        'postal_code', l.postal_code,
                        'latitude', l.latitude,
                        'longitude', l.longitude
                    )
                )
            )
            FROM businesses b
            LEFT JOIN locations l ON b.location_id = l.id
            LEFT JOIN business_categories bc ON b.category = bc.id
            WHERE b.id = b_id
        ),
                    
        'gallery', (
            SELECT json_agg(
                json_build_object(
                    'id', bg.id,
                    'image_url', bg.image_url,
                    'thumbnail_url', bg.thumbnail_url,
                    'description', bg.caption
                )
            )
            FROM business_gallery bg
            WHERE bg.business_id = b_id
        ),
        
        'features', (
            SELECT json_agg(
                json_build_object(
                    'id', bf.id,
                    'name', bf.feature_name,
                    'is_available', bf.is_available
                )
            )
            FROM business_features bf
            WHERE bf.business_id = b_id and bf.is_available
        ),
        
        'working_hours', (
            SELECT json_agg(
                json_build_object(
                    'day_of_week', wh.day_of_week,
                    'start_time', wh.start_time,
                    'end_time', wh.end_time,
                    'is_available', wh.is_available
                )
            )
            FROM working_hours wh
            WHERE wh.business_id = b_id and wh.is_available
        ),
        
        'staff', (
            SELECT json_agg(
                json_build_object(
                    'id', bs.id,
                    'position', bs.position,
                    'is_active', bs.is_active,
                    'user_id', bs.user_id,
                    'profile', (
                        SELECT json_build_object(
                            'first_name', p.first_name,
                            'last_name', p.last_name,
                            'profile_picture', p.profile_picture,
                            'bio', p.bio,
                            'preferred_language', p.preferred_language,
                            'specialties', p.specialties,
                            'years_of_experience', p.years_of_experience,
                            'education', p.education,
                            'certifications', p.certifications,
                            'languages', p.languages
                        )
                        FROM profiles p
                        WHERE p.user_id = bs.user_id
                    ),
                    'services', (
                        SELECT json_agg(
                            json_build_object(
                                'id', s.id,
                                'name', s.name,
                                'description', s.description,
                                'duration', s.duration,
                                'base_price', s.base_price
                            )
                        )
                        FROM staff_services ss
                        JOIN services s ON s.id = ss.service_id
                        WHERE ss.staff_id = bs.id
                    )
                )
            )
            FROM business_staff bs
            WHERE bs.business_id = b_id
        ),
        'services', (
            SELECT json_agg(
                json_build_object(
                    'id', s.id,
                    'name', s.name,
                    'description', s.description,
                    'duration', s.duration,
                    'base_price', s.base_price,
                    'sub_category', json_build_object(
                        'id', sc.id,
                        'name', sc.name,
                        'display_name', sc.display_name
                    )
                )
            )
            FROM services s
            LEFT JOIN sub_categories sc ON s.sub_category = sc.id
            WHERE s.business_id = b_id and s.is_active
        ), 
        'products', (
            SELECT json_agg(
                json_build_object(
                    'id', p.id,
                    'name', p.name,
                    'description', p.description,
                    'price', p.price,
                    'stock_quantity', p.stock_quantity,
                    'is_active', p.is_active
                )
            )
            FROM products p
            WHERE p.business_id = b_id and p.is_active
        ),        
        'offers', (
            SELECT json_agg(
                json_build_object(
                    'id', d.id,
                    'name', d.title,
                    'description', d.description,
                    'start_date', d.start_date,
                    'end_date', d.end_date,
                    'original_price', d.original_price,
                    'image_url', d.image_url,
                    'now_price', d.now_price,
                    'sub_category', json_build_object(
                        'id', sc.id,
                        'name', sc.name,
                        'display_name', sc.display_name
                    )
                )
            )
            FROM deals d
            LEFT JOIN sub_categories sc ON d.sub_category = sc.id
            WHERE d.business_id = b_id and d.is_active
        ),
        'additional_info', (    
            SELECT json_agg(
                json_build_object(
                    'id', ai.id,
                    'description', ai.description,
                    'is_available', ai.is_available
                )
            )
            FROM additional_info ai
            WHERE ai.business_id = b_id
        ),
        'business_story', (
            SELECT json_agg(
                json_build_object(
                    'id', bs.id,
                    'title', bs.title,
                    'image_url', bs.image_url,
                    'created_at', bs.created_at,
                    'is_available', bs.is_available
                )
            )
            FROM business_story bs
            WHERE bs.business_id = b_id and bs.is_available
        )
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
