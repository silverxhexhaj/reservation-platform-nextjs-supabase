import { StaffPerformingService } from "@/app/models/functions/staffPerformingService.model"
import { supabase } from "@/app/lib/supabase"


export async function fetchStaffThatPerformsService(businessId: string, serviceIds: string[]): Promise<StaffPerformingService[]> {
    const { data, error } = await supabase.rpc('get_staff_that_performs_service', { p_business_id: businessId, p_service_ids: serviceIds })

    if (error) {
        return []
    }

    return data as StaffPerformingService[]
}
