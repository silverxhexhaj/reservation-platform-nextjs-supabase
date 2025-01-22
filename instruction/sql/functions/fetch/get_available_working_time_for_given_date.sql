DROP FUNCTION IF EXISTS get_available_working_time_for_given_date;

CREATE OR REPLACE FUNCTION get_available_working_time_for_given_date(
    p_business_id UUID,
    p_staff_id UUID,
    p_service_ids UUID[],
    p_date DATE
)
RETURNS TABLE (available_time TIMESTAMP WITH TIME ZONE) AS $$
DECLARE
    total_duration INTEGER;
BEGIN
    -- Get total duration of all services
    SELECT COALESCE(SUM(duration), 0) 
    INTO total_duration
    FROM services 
    WHERE id = ANY(p_service_ids);

    RETURN QUERY
    WITH staff_working_hours AS (
        SELECT 
            wh.start_time,
            wh.end_time
        FROM working_hours wh
        WHERE wh.staff_id = p_staff_id
        AND wh.day_of_week = EXTRACT(DOW FROM p_date)
        AND wh.is_available = true
    ),
    existing_bookings AS (
        SELECT 
            start_time,
            end_time
        FROM bookings
        WHERE staff_id = p_staff_id
        AND DATE(start_time) = p_date
        AND status NOT IN ('cancelled')
    ),
    staff_blocked_times AS (
        SELECT 
            start_time,
            end_time
        FROM staff_blocked_periods
        WHERE staff_id = p_staff_id
        AND DATE(start_time) = p_date
    ),
    time_slots AS (
        SELECT generate_series(
            (p_date + wh.start_time)::timestamp,
            (p_date + wh.end_time - make_interval(mins := total_duration))::timestamp,
            '30 minutes'::interval
        ) AS slot_start
        FROM staff_working_hours wh
    )
    SELECT slot_start::timestamp with time zone
    FROM time_slots ts
    WHERE NOT EXISTS (
        -- Check for conflicts with existing bookings
        SELECT 1
        FROM existing_bookings eb
        WHERE (
            ts.slot_start, 
            ts.slot_start + make_interval(mins := total_duration)
        ) OVERLAPS (eb.start_time, eb.end_time)
    )
    AND NOT EXISTS (
        -- Check for conflicts with blocked periods
        SELECT 1
        FROM staff_blocked_times sbt
        WHERE (
            ts.slot_start, 
            ts.slot_start + make_interval(mins := total_duration)
        ) OVERLAPS (sbt.start_time, sbt.end_time)
    )
    ORDER BY ts.slot_start;
END;
$$ LANGUAGE plpgsql;
