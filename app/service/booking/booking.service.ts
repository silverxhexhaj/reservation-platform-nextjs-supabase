import { TimeSlot } from "@/app/models/functions/timeslot.model";
import { supabase } from "@/lib/supabase";

export async function getAvailableDatesToBook(businessId: string, staffId: string, serviceIds: string[]) {
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
