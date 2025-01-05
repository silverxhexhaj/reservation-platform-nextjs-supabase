export interface BusinessWithLocation {
    id: string;
    name: string;
    description: string | null;
    category: string;
    price_range: string | null;
    cover_picture: string | null;
    is_premium: boolean;
    tags: string[] | null;
    owner_id: string;
    location: {
      id: string;
      name: string;
      address: string;
      city: string;
      state: string | null;
      country: string;
      postal_code: string;
      latitude: number;
      longitude: number;
      timezone: string;
    } | null;
    average_rating: number;
    review_count: number;
  }
  