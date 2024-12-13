"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Business, BusinessOffer } from "@/data";

interface FeaturedDealCardProps {
  offer: BusinessOffer;
  business: Business;
}

export function FeaturedDealCard({ offer, business }: FeaturedDealCardProps) {
  return (
    <Link 
      href={`/business/${business.id}?offer=${offer.id}`}
      className="group block"
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
} 