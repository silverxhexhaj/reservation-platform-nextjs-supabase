
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BusinessSummary, LoadInitialBusinessesResponse } from '@/app/models/functions/businessSummary.model'

interface FetchBusinessesParams {
  searchTerm?: string | null
  selectedCategory?: string | null 
  limit?: number
  offset?: number
}

const supabase = createClientComponentClient()

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