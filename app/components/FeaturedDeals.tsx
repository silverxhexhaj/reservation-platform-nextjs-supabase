"use client";

import { FeaturedDealCard } from "./FeaturedDealCard";
import { businesses, businessOffers } from "@/data/mock";

export function FeaturedDeals() {
  // Get businesses with offers
  const businessesWithOffers = businesses.filter(business => business.offers && business.offers.length > 0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">Featured Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessesWithOffers.map((business) => (
            business.offers?.map((offer) => (
              <FeaturedDealCard 
                key={`${business.id}-${offer.id}`} 
                business={business} 
                offer={offer}
              />
            ))
          ))}
        </div>
      </div>
    </section>
  );
} 