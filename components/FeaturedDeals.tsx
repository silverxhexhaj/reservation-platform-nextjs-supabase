"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { businessOffers } from "@/data/offers";
import { businesses } from "@/data/businesses";
import { useRouter } from "next/navigation";

export function FeaturedDeals() {
  const router = useRouter();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">Featured Deals</h2>
            <p className="text-gray-600 mt-2">Limited time offers from our top partners</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => router.push('/deals')}
          >
            View All Deals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessOffers.slice(0, 3).map((offer) => {
            const business = businesses.find(b => b.id === offer.businessId);
            
            if (!business) return null;

            return (
              <Link 
                href={`/business/${business.id}?offer=${offer.id}`}
                key={offer.id}
                className="group"
              >
                <div className="relative bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200">
                  {/* Image Container */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image 
                      src={offer.imageUrl}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Business Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <span className="font-medium truncate mr-2">{business.name}</span>
                        <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm">{business.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-50">
                        {offer.discountPercentage}% OFF
                      </Badge>
                      <Badge variant="outline" className="text-gray-600">
                        {business.category}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {offer.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 line-through">${offer.originalPrice}</p>
                        <p className="text-lg font-bold text-gray-900">${offer.discountedPrice}</p>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-sm border-gray-200 hover:bg-gray-50"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
} 