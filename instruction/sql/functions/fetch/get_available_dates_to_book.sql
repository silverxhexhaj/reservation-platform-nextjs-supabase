CREATE OR REPLACE FUNCTION get_available_dates_to_book(
    p_business_id UUID,
    p_staff_id UUID,
    p_service_ids UUID[]
)
RETURNS TABLE (available_date DATE) AS $$
DECLARE
    total_duration INTEGER;
    curr_date DATE := CURRENT_DATE;
    end_date DATE := CURRENT_DATE + INTERVAL '15 days';
BEGIN
    -- Get total duration of all services
    SELECT COALESCE(SUM(duration), 0) 
    INTO total_duration
    FROM services 
    WHERE id = ANY(p_service_ids);

    RETURN QUERY
    WITH date_series AS (
        SELECT generate_series(curr_date, end_date, '1 day'::interval)::date AS check_date
    ),
    staff_working_hours AS (
        SELECT 
            wh.day_of_week,
            wh.start_time::time,
            wh.end_time::time
        FROM working_hours wh
        WHERE wh.staff_id = p_staff_id 
        AND wh.is_available = true
    ),
    existing_bookings AS (
        SELECT 
            DATE(start_time) as booking_date,
            start_time,
            end_time
        FROM bookings b
        WHERE b.staff_id = p_staff_id
        AND b.status NOT IN ('cancelled')
        AND DATE(start_time) BETWEEN curr_date AND end_date
    ),
    staff_blocked_times AS (
        SELECT 
            DATE(sbt.start_time) as blocked_date,
            sbt.start_time,
            sbt.end_time
        FROM staff_blocked_periods sbt
        WHERE sbt.staff_id = p_staff_id
        AND DATE(sbt.start_time) BETWEEN curr_date AND end_date
    ),
    available_slots AS (
        SELECT 
            ds.check_date,
            COUNT(*) as available_slot_count
        FROM date_series ds
        JOIN staff_working_hours wh ON wh.day_of_week = EXTRACT(DOW FROM ds.check_date)
        CROSS JOIN LATERAL (
            SELECT gs.slot_start
            FROM generate_series(
                (ds.check_date + wh.start_time)::timestamp,
                (ds.check_date + wh.end_time - make_interval(mins := total_duration))::timestamp,
                (SELECT duration || ' minutes'::interval FROM booking_timeslots WHERE business_id = p_business_id)
            ) gs(slot_start)
            WHERE NOT EXISTS (
                SELECT 1
                FROM existing_bookings eb
                WHERE eb.booking_date = ds.check_date
                AND (
                    gs.slot_start,
                    gs.slot_start + make_interval(mins := total_duration)
                ) OVERLAPS (eb.start_time, eb.end_time)
            )
            AND NOT EXISTS (
                SELECT 1
                FROM staff_blocked_times sbt
                WHERE sbt.blocked_date = ds.check_date
                AND (
                    gs.slot_start,
                    gs.slot_start + make_interval(mins := total_duration)
                ) OVERLAPS (sbt.start_time, sbt.end_time)
            )
        ) slots
        GROUP BY ds.check_date
    )
    SELECT check_date
    FROM available_slots
    WHERE available_slot_count > 0
    ORDER BY check_date;
END;
$$ LANGUAGE plpgsql;

-- Example query to call this function:
/*
SELECT * FROM get_available_dates_to_book(
    p_business_id := 'your-business-uuid',
    p_staff_id := 'your-staff-uuid',
    p_service_ids := ARRAY['service-uuid-1', 'service-uuid-2']
);
*/
