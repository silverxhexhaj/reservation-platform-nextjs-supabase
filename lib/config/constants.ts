export const BUSINESS_CATEGORIES = {
  ALL: "all",
  RESTAURANTS: "restaurants",
  RETAIL: "retail",
  // ... other categories
} as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[keyof typeof BUSINESS_CATEGORIES]; 