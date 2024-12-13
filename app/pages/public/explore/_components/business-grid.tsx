import { type Business } from "@/app/lib/types/business";
import { BusinessCard } from "./business-card";

interface BusinessGridProps {
  businesses: Business[];
}

export function BusinessGrid({ businesses }: BusinessGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
} 