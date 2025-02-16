
import { supabase } from '@/app/lib/supabase/client';
import { BusinessSummary, LoadInitialBusinessesResponse } from '@/app/models/functions/businessSummary.model'
import { HomePageBusinesses } from '@/app/models/functions/homePageBusinesses.models'
import { BusinessDetails } from '@/app/models/functions/businessDetails.model'

interface FetchBusinessesParams {
  searchTerm?: string | null
  selectedCategory?: string | null 
  limit?: number
  offset?: number
}


export async function fetchBusinessesWithFilters({
  searchTerm = null,
  selectedCategory = null,
  limit = 25,
  offset = 0
}: FetchBusinessesParams = {}): Promise<BusinessSummary[]> {

  const { data, error } = await supabase
    .rpc('fetch_businesses_with_filters', {
      search_term: searchTerm,
      selected_category: selectedCategory,
      limit_count: limit,
      offset_count: offset
    })

  if (error) {
    console.error('Error fetching businesses:', error)
    return []
  }

  return data as BusinessSummary[]
}

export async function loadInitialBusinesses(): Promise<LoadInitialBusinessesResponse> {
  const { data, error } = await supabase.rpc('load_initial_businesses')
  if (error) {
    return {
      popular: [],
      all_businesses: [],
      for_women: [],
      for_men: [],
      premium: []
    }
  }

  return data as LoadInitialBusinessesResponse
}


export async function fetchHomePageBusinesses(): Promise<HomePageBusinesses> {
  const { data, error } = await supabase.rpc('fetch_home_page_businesses')

  if (error) {
    return {
      top_businesses: [],
      special_offers: [],
      new_businesses: [], 
      best_rated: []
    }
  }

  return data as HomePageBusinesses
  
}

export async function fetchBusinessById(businessId: string): Promise<BusinessDetails | null> {
  const { data, error } = await supabase.rpc('get_business_by_id', { b_id: businessId })
  if (error) {
    return null
  }
  return data as BusinessDetails
}
