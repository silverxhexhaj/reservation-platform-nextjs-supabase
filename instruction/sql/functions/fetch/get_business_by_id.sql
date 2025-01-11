DROP FUNCTION IF EXISTS get_business_by_id(business_id UUID);

CREATE OR REPLACE FUNCTION get_business_by_id(business_id UUID)
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
                'email', b.email,
                'phone', b.phone,
                'website', b.website,
                'is_active', b.is_active,
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
                    FROM locations l
                    WHERE l.business_id = b.id
                ),
                
                'gallery', (
                    SELECT json_agg(
                        json_build_object(
                            'id', bg.id,
                            'image_url', bg.image_url,
                            'description', bg.description
                        )
                    )
                    FROM business_gallery bg
                    WHERE bg.business_id = b.id
                ),
                
                'features', (
                    SELECT json_agg(
                        json_build_object(
                            'id', f.id,
                            'name', f.name,
                            'description', f.description
                        )
                    )
                    FROM business_features bf
                    JOIN features f ON f.id = bf.feature_id
                    WHERE bf.business_id = b.id
                ),
                
                'working_hours', (
                    SELECT json_agg(
                        json_build_object(
                            'day_of_week', wh.day_of_week,
                            'start_time', wh.start_time,
                            'end_time', wh.end_time,
                            'hourly_rate', wh.hourly_rate,
                            'is_available', wh.is_available
                        )
                    )
                    FROM working_hours wh
                    WHERE wh.business_id = b.id
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
                                    'specialties', p.specialties,
                                    'years_of_experience', p.years_of_experience
                                )
                                FROM profiles p
                                WHERE p.user_id = bs.user_id
                            ),
                            'services', (
                                SELECT json_agg(
                                    json_build_object(
                                        'id', s.id,
                                        'name', s.name
                                    )
                                )
                                FROM staff_services ss
                                JOIN services s ON s.id = ss.service_id
                                WHERE ss.staff_id = bs.id
                            )
                        )
                    )
                    FROM business_staff bs
                    WHERE bs.business_id = b.id
                ),
                
                'services', (
                    SELECT json_agg(
                        json_build_object(
                            'id', s.id,
                            'name', s.name,
                            'description', s.description,
                            'duration', s.duration,
                            'base_price', s.base_price,
                            'is_active', s.is_active
                        )
                    )
                    FROM services s
                    WHERE s.business_id = b.id
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
                    WHERE p.business_id = b.id
                ),
                
                'deals', (
                    SELECT json_agg(
                        json_build_object(
                            'id', d.id,
                            'name', d.name,
                            'description', d.description,
                            'start_date', d.start_date,
                            'end_date', d.end_date,
                            'status', d.status
                        )
                    )
                    FROM deals d
                    WHERE d.business_id = b.id
                ),
                
                'reviews', (
                    SELECT json_build_object(
                        'average_rating', COALESCE(AVG(r.rating), 0),
                        'total_reviews', COUNT(r.id),
                        'reviews', json_agg(
                            json_build_object(
                                'id', r.id,
                                'rating', r.rating,
                                'comment', r.comment,
                                'created_at', r.created_at,
                                'user_id', r.user_id,
                                'profile', (
                                    SELECT json_build_object(
                                        'first_name', p.first_name,
                                        'last_name', p.last_name,
                                        'profile_picture', p.profile_picture
                                    )
                                    FROM profiles p
                                    WHERE p.user_id = r.user_id
                                )
                            )
                        )
                    )
                    FROM reviews r
                    WHERE r.business_id = b.id
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
                    WHERE ai.business_id = b.id
                ),
                'business_story', (
                    SELECT json_agg(
                        json_build_object(
                            'id', bs.id,
                            'title', bs.title,
                            'image_url', bs.image_url,
                            'is_available', bs.is_available
                        )
                    )
                    FROM business_story bs
                    WHERE bs.business_id = b.id
                )
            )
            FROM businesses b
            WHERE b.id = business_id
        )
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
