
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BusinessWithLocation } from '@/app/models/functions/businessWithLocation.model'
import { LoadInitialBusinessesResponse } from '@/app/models/functions/businessSummary.model'

interface FetchBusinessesParams {
  searchTerm?: string | null
  selectedCategories?: string[] | null 
  isPremium?: boolean | null
  limit?: number
  offset?: number
}

export async function fetchBusinessesWithFilters({
  searchTerm = null,
  selectedCategories = null,
  isPremium = null,
  limit = 25,
  offset = 0
}: FetchBusinessesParams = {}): Promise<BusinessWithLocation[]> {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase
    .rpc('fetch_businesses_with_filters', {
      search_term: searchTerm,
      selected_categories: selectedCategories,
      is_premium: isPremium,
      limit_count: limit,
      offset_count: offset
    })

  if (error) {
    console.error('Error fetching businesses:', error)
    return []
  }

  return data as BusinessWithLocation[]
}

export async function loadInitialBusinesses(): Promise<LoadInitialBusinessesResponse> {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase.rpc('load_initial_businesses')

  if (error) {
    console.error('Error loading initial businesses:', error)
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