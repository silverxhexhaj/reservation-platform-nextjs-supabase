DROP FUNCTION IF EXISTS get_staff_that_performs_service;

CREATE OR REPLACE FUNCTION get_staff_that_performs_service(
    p_business_id UUID,
    p_service_ids UUID[]
)
RETURNS TABLE (
    staff_id UUID,
    user_id UUID,
    staff_position VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_picture TEXT,
    bio TEXT,
    specialties TEXT[],
    years_of_experience INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        bs.id as staff_id,
        bs.user_id,
        bs.position as staff_position,
        p.first_name,
        p.last_name,
        p.profile_picture,
        p.bio,
        p.specialties,
        p.years_of_experience
    FROM business_staff bs
    INNER JOIN profiles p ON p.user_id = bs.user_id
    WHERE bs.business_id = p_business_id
    AND bs.is_active = true
    AND EXISTS (
        SELECT 1
        FROM services s
        WHERE s.id = ANY(p_service_ids)
        AND s.business_id = bs.business_id
    )
    ORDER BY p.first_name, p.last_name;
END;
$$ LANGUAGE plpgsql;
