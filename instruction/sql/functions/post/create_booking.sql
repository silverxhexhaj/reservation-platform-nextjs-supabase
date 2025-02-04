DROP FUNCTION IF EXISTS create_booking;

CREATE OR REPLACE FUNCTION create_booking(
    p_user_id UUID,
    p_business_id UUID,
    p_staff_id UUID DEFAULT NULL,
    p_service_ids UUID[],
    p_start_timeslot_id UUID,
    p_booking_date DATE, 
    p_note TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    v_booking_uuid UUID;
    v_service_id UUID;
    v_timeslot_id UUID;
    v_service_duration INT;
    v_current_timeslot_id UUID := p_start_timeslot_id;
    v_total_duration INT := 0;
BEGIN
    -- Lock relevant tables to prevent concurrent modifications
    LOCK TABLE bookings IN EXCLUSIVE MODE;
    LOCK TABLE booking_services IN EXCLUSIVE MODE;
    LOCK TABLE booking_timeslots IN EXCLUSIVE MODE;

    -- Calculate total duration of all services
    FOREACH v_service_id IN ARRAY p_service_ids LOOP
        SELECT duration INTO v_service_duration 
        FROM services 
        WHERE id = v_service_id;
        
        IF v_service_duration IS NULL THEN
            RAISE EXCEPTION 'Service with id % not found', v_service_id;
        END IF;
        
        v_total_duration := v_total_duration + v_service_duration;
    END LOOP;

    -- Create the booking
    INSERT INTO bookings (
        user_booked_id,
        business_id,
        staff_id,
        status,
        date,
        note
    ) VALUES (
        p_user_id,
        p_business_id,
        p_staff_id,
        'pending'::booking_status,
        p_booking_date,
        p_note
    ) RETURNING id INTO v_booking_uuid;

    -- Insert booking services
    FOREACH v_service_id IN ARRAY p_service_ids LOOP
        INSERT INTO booking_services (booking_id, service_id)
        VALUES (v_booking_uuid, v_service_id);
    END LOOP;

    -- Insert booking timeslots
    FOR i IN 1..(v_total_duration / 30) LOOP
        -- Check if timeslot is already booked
        PERFORM 1 
        FROM booking_timeslots 
        WHERE timeslot_id = v_current_timeslot_id 
          AND booking_id IN (
            SELECT id 
            FROM bookings 
            WHERE date = p_booking_date
          );
        
        IF FOUND THEN
            RAISE EXCEPTION 'Timeslot % is already booked', v_current_timeslot_id;
        END IF;

        INSERT INTO booking_timeslots (booking_id, timeslot_id)
        VALUES (v_booking_uuid, v_current_timeslot_id);
        
        -- Get next timeslot
        SELECT id INTO v_current_timeslot_id
        FROM timeslots
        WHERE start_time = (
            SELECT end_time
            FROM timeslots
            WHERE id = v_current_timeslot_id
        );
        
        IF v_current_timeslot_id IS NULL THEN
            RAISE EXCEPTION 'No available timeslot after %', v_current_timeslot_id;
        END IF;
    END LOOP;

    RETURN v_booking_uuid;
END;
$$ LANGUAGE plpgsql;
