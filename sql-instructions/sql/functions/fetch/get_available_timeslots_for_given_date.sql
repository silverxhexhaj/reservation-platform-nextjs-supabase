DROP FUNCTION IF EXISTS get_available_timeslots_for_given_date;

CREATE OR REPLACE FUNCTION get_available_timeslots_for_given_date(
  p_business_id UUID,
  p_date DATE
)
RETURNS TABLE (
  timeslot_id UUID,
  start_time TIME,
  end_time TIME
) AS $$
BEGIN
  RETURN QUERY
  WITH business_hours AS (
    -- Get business working hours for the given day
    SELECT 
      wh.start_time as bh_start,
      wh.end_time as bh_end
    FROM working_hours wh
    WHERE wh.business_id = p_business_id
    AND wh.day_of_week = EXTRACT(DOW FROM p_date)
    AND wh.is_available = true
  ),
  booked_slots AS (
    -- Get all booked timeslots for the given date
    SELECT DISTINCT t.id
    FROM timeslots t
    INNER JOIN booking_timeslots bt ON bt.timeslot_id = t.id
    INNER JOIN bookings b ON b.id = bt.booking_id
    WHERE b.business_id = p_business_id
    AND b.date = p_date
    AND b.status NOT IN ('cancelled')
  )
  SELECT 
    t.id,
    t.start_time,
    t.end_time
  FROM timeslots t
  CROSS JOIN business_hours bh
  WHERE t.id NOT IN (SELECT id FROM booked_slots)
  -- Only return timeslots within business hours
  AND t.start_time >= bh.bh_start
  AND t.end_time <= bh.bh_end
  ORDER BY t.start_time;
END;
$$ LANGUAGE plpgsql;
