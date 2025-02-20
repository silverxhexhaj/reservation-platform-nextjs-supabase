import { supabase } from '@/app/lib/supabase/client';
import { DealsResponse } from '@/app/models/functions/searchDeals.model';

export async function fetchDeals(page_number: number = 1, page_size: number = 50, category_id: string | null = null, search_text: string | null = null): Promise<DealsResponse> {
  try {
    const { data, error } = await supabase.rpc('fetch_deals', {
      p_page_number: page_number,
      p_page_size: page_size,
      p_category_id: category_id,
      p_search_text: search_text
    });

    if (error) {
      console.error('Error fetching deals:', error);
      return { count: 0, items: [] };
    }

    return data as DealsResponse;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return { count: 0, items: [] };
  }
}
