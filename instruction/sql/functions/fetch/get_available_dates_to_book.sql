DROP FUNCTION IF EXISTS get_available_dates_to_book;

CREATE OR REPLACE FUNCTION get_available_dates_to_book(
  p_business_id UUID,
  p_staff_id UUID,
  p_service_ids UUID[]
)
RETURNS DATE[] AS $$
DECLARE
  total_duration INTEGER;
  v_current_date DATE;
  v_end_date DATE;
  result_dates DATE[];
BEGIN
  -- Calculate total duration needed for all services
  SELECT COALESCE(SUM(duration), 0) 
  INTO total_duration
  FROM services 
  WHERE id = ANY(p_service_ids);

  -- Set date range
  v_current_date := CURRENT_DATE;
  v_end_date := v_current_date + INTERVAL '30 days';

  -- Get available dates into array
  WITH business_hours AS (
    -- Get business working hours
    SELECT 
      day_of_week,
      start_time,
      end_time
    FROM working_hours
    WHERE business_id = p_business_id
    AND is_available = true
  ),
  staff_hours AS (
    -- Get staff working hours if staff specified
    SELECT 
      day_of_week,
      start_time,
      end_time
    FROM working_hours
    WHERE staff_id = p_staff_id
    AND is_available = true
  ),
  date_series AS (
    -- Generate series of dates for next 30 days
    SELECT generate_series(v_current_date, v_end_date, '1 day'::interval)::date AS date
  ),
  booked_slots AS (
    -- Get all booked timeslots
    SELECT DISTINCT b.date
    FROM bookings b
    JOIN booking_timeslots bt ON b.id = bt.booking_id
    WHERE b.business_id = p_business_id
    AND (p_staff_id IS NULL OR b.staff_id = p_staff_id)
    AND b.status NOT IN ('cancelled')
    AND b.date BETWEEN v_current_date AND v_end_date
    GROUP BY b.date
    -- Check if remaining time slots are less than needed duration
    HAVING (EXTRACT(EPOCH FROM (
      COALESCE(
        CASE 
          WHEN p_staff_id IS NOT NULL THEN 
            (SELECT SUM(end_time - start_time) FROM staff_hours)
          ELSE 
            (SELECT SUM(end_time - start_time) FROM business_hours)
        END,
        '0'::interval
      )
    ))/60)::integer - COUNT(bt.timeslot_id) * 30 < total_duration
  )
  SELECT array_agg(ds.date ORDER BY ds.date)
  INTO result_dates
  FROM date_series ds
  WHERE 
    -- Exclude dates with insufficient availability
    ds.date NOT IN (SELECT date FROM booked_slots)
    -- Only include dates where either business or staff is working
    AND EXTRACT(DOW FROM ds.date) IN (
      SELECT day_of_week FROM (
        SELECT day_of_week FROM business_hours
        UNION
        SELECT day_of_week FROM staff_hours
      ) combined_hours
    );

  RETURN COALESCE(result_dates, ARRAY[]::DATE[]);
END;
$$ LANGUAGE plpgsql;
