import { TimeSlot } from "@/app/models/functions/timeslot.model";
import { Booking } from "@/app/models/supabase.models";
import { supabase } from "@/app/lib/supabase";

export async function getAvailableDatesToBook(businessId: string, staffId?: string | null, serviceIds: string[] = []) {
    const { data, error } = await supabase.rpc('get_available_dates_to_book', {
        p_business_id: businessId,
        p_staff_id: staffId,
        p_service_ids: serviceIds
    });
    if (error) {
        return [];
    }

    return (data as string[]).map((date) => new Date(date));
}


export async function getAvailableTimeSlotsForGivenDate(businessId: string, date: Date) {
    const { data, error } = await supabase.rpc('get_available_timeslots_for_given_date', {
        p_business_id: businessId,
        p_date: date
    });

    if (error) {
        return [];
    }

    return data as TimeSlot[];
}


export async function createBooking(
    p_user_id: string,
    p_business_id: string,
    p_staff_id: string | null,
    p_service_ids: string[],
    p_start_timeslot_id: string,
    p_date: string,
    p_note: string
) {
    const { data, error } = await supabase.rpc('create_booking', {
        p_user_id: p_user_id,
        p_business_id: p_business_id,
        p_staff_id: p_staff_id,
        p_service_ids: p_service_ids,
        p_date: p_date,
        p_start_timeslot_id: p_start_timeslot_id,
        p_note: p_note
    });


    if (error) {
        throw error;
    }

    return data;
}


