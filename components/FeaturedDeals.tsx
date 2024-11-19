"use client";

import { Card } from "@/components/ui/card";
import { businesses } from "@/data/businesses";

export function FeaturedDeals() {
  const featuredBusinesses = businesses.slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">Featured Businesses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map((business) => (
            <Card key={business.id} className="p-4">
              <h3 className="font-semibold">{business.name}</h3>
              <p className="text-sm text-gray-600">{business.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 