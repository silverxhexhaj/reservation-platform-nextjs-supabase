'use client';

import { type Business } from "@/app/lib/types/business";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Star, MapPin, Clock, Award, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const isPremium = business.rating >= 4.5;
  const isTopRated = business.rating >= 4.0 && (business.reviewCount || 0) >= 50;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {isPremium && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Award className="h-4 w-4" />
            <span className="text-xs font-medium">Premium</span>
          </div>
        </div>
      )}
      {isTopRated && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Trophy className="h-4 w-4" />
            <span className="text-xs font-medium">Top Rated</span>
          </div>
        </div>
      )}
      <div className="relative h-48 w-full">
        <Image
          src={business.imageUrl}
          alt={business.name}
          fill
          className={cn(
            "object-cover",
            (isPremium || isTopRated) && "brightness-[0.95]"
          )}
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1 flex items-center gap-2">
              {business.name}
              {isPremium && <Award className="h-4 w-4 text-amber-500" />}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{business.category}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className={cn("h-4 w-4", business.rating >= 4.5 ? "fill-amber-500" : "fill-current")} />
            <span className="text-sm font-medium">{business.rating}</span>
            {business.reviewCount && (
              <span className="text-sm text-muted-foreground">({business.reviewCount})</span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{business.location.address}, {business.location.city}</span>
          </div>
          {business.hours && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Open today: {business.hours['monday']?.open} - {business.hours['monday']?.close}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-sm font-medium">{business.priceRange}</div>
          <Link href={`/business/${business.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 